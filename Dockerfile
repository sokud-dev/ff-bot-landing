FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS runner

ENV PORT=80
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD sh -c 'wget -qO- "http://127.0.0.1:${PORT:-80}/" > /dev/null || exit 1'

CMD ["nginx", "-g", "daemon off;"]
