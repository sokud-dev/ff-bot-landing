/**
 * Ссылки на веб‑приложение Fulfillment (другой origin).
 *
 * Логика: с лендинга пользователь **переходит в приложение** (логин / регистрация там),
 * без возврата на лендинг с токеном в URL.
 */

const DEFAULT_FULFILLMENT_ORIGIN = 'https://fulfillment-web-production.up.railway.app'

export function getFulfillmentOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_FULFILLMENT_WEB_URL?.trim()
  return (raw || DEFAULT_FULFILLMENT_ORIGIN).replace(/\/$/, '')
}

/** Страница входа в приложении (путь относительно origin). */
export function getFulfillmentLoginPath(): string {
  const p = process.env.NEXT_PUBLIC_FULFILLMENT_LOGIN_PATH?.trim()
  return p?.startsWith('/') ? p : '/login'
}

export function getFulfillmentLoginPageUrl(): string {
  return `${getFulfillmentOrigin()}${getFulfillmentLoginPath()}`
}

/** Ссылка на форму входа Fulfillment; опционально подставить email. */
export function buildFulfillmentLoginUrl(options: { email?: string } = {}): string {
  const u = new URL(getFulfillmentLoginPageUrl())
  const email = options.email?.trim()
  if (email) u.searchParams.set('email', email)
  return u.toString()
}

export function buildFulfillmentRegisterUrl(options: { email?: string; name?: string } = {}): string {
  const u = new URL(`${getFulfillmentOrigin()}/register`)
  const email = options.email?.trim()
  if (email) u.searchParams.set('email', email)
  const name = options.name?.trim()
  if (name) {
    u.searchParams.set('full_name', name)
    u.searchParams.set('name', name)
  }
  return u.toString()
}

export function fulfillmentForgotPasswordUrl(): string {
  return `${getFulfillmentOrigin()}/forgot-password`
}
