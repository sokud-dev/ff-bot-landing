/**
 * Связка лендинга (статический Next) с приложением Fulfillment на другом origin.
 *
 * Ожидаемое поведение на стороне Fulfillment (нужно реализовать там, если ещё нет):
 * - GET /login: читает query `return_url` (полный URL лендинга), опционально `email` для подстановки в форму.
 *   После успешного входа — редирект на `return_url` с токенами в query или в hash:
 *   `?access_token=...&refresh_token=...` или `#access_token=...&refresh_token=...`
 *   (допустим алиас `token` вместо `access_token`).
 * - GET /register: аналогично `return_url`, опционально `email`, `full_name`.
 */
const DEFAULT_FULFILLMENT_ORIGIN = 'https://fulfillment-web-production.up.railway.app'

export function getFulfillmentOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_FULFILLMENT_WEB_URL ?? DEFAULT_FULFILLMENT_ORIGIN
  return raw.replace(/\/$/, '')
}

export function buildLandingReturnUrl(path: string): string {
  if (typeof window === 'undefined') return ''
  const p = path.startsWith('/') ? path : `/${path}`
  return `${window.location.origin}${p}`
}

export function buildFulfillmentLoginUrl(opts: { email?: string; returnPath?: string }): string {
  const origin = getFulfillmentOrigin()
  const u = new URL(`${origin}/login`)
  u.searchParams.set('return_url', buildLandingReturnUrl(opts.returnPath ?? '/dashboard'))
  const email = opts.email?.trim()
  if (email) u.searchParams.set('email', email)
  return u.toString()
}

export function buildFulfillmentRegisterUrl(opts: {
  email?: string
  fullName?: string
  returnPath?: string
}): string {
  const origin = getFulfillmentOrigin()
  const u = new URL(`${origin}/register`)
  u.searchParams.set('return_url', buildLandingReturnUrl(opts.returnPath ?? '/dashboard'))
  const email = opts.email?.trim()
  if (email) u.searchParams.set('email', email)
  const name = opts.fullName?.trim()
  if (name) u.searchParams.set('full_name', name)
  return u.toString()
}

export function buildFulfillmentForgotPasswordUrl(): string {
  return `${getFulfillmentOrigin()}/forgot-password`
}

/** Сохраняет токены из query/hash и возвращает true, если что-то было извлечено. */
export function consumeAuthTransferFromUrl(): boolean {
  if (typeof window === 'undefined') return false

  const url = new URL(window.location.href)
  let accessToken = url.searchParams.get('access_token') ?? url.searchParams.get('token')
  let refreshToken = url.searchParams.get('refresh_token')
  const emailParam = url.searchParams.get('email')

  const hash = window.location.hash?.replace(/^#/, '') ?? ''
  if (hash) {
    const hp = new URLSearchParams(hash)
    accessToken = accessToken ?? hp.get('access_token') ?? hp.get('token')
    refreshToken = refreshToken ?? hp.get('refresh_token')
  }

  if (!accessToken) return false

  localStorage.setItem('token', accessToken)
  if (refreshToken) localStorage.setItem('refresh_token', refreshToken)

  if (emailParam) {
    try {
      const email = decodeURIComponent(emailParam)
      const prev = localStorage.getItem('user')
      let name: string | undefined
      if (prev) {
        try {
          name = (JSON.parse(prev) as { name?: string }).name
        } catch {
          /* ignore */
        }
      }
      localStorage.setItem('user', JSON.stringify({ email, ...(name ? { name } : {}) }))
    } catch {
      localStorage.setItem('user', JSON.stringify({ email: emailParam }))
    }
  }

  window.history.replaceState({}, '', `${url.pathname}`)
  return true
}
