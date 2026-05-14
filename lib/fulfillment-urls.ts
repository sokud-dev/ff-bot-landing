/**
 * Связка лендинга и веб‑приложения Fulfillment (разные origin на Railway).
 *
 * Лендинг не может читать httpOnly‑куки платформы — после входа Fulfillment должен
 * вернуть пользователя на лендинг с токеном, например:
 *   GET {SITE}/auth/callback?token=<jwt>
 * или фрагмент: #access_token=<jwt>
 *
 * Параметр returnUrl на стороне Fulfillment должен быть разрешён (allowlist)
 * и подставляться в редирект после успешного входа/регистрации.
 */

const DEFAULT_FULFILLMENT_ORIGIN = 'https://fulfillment-web-production.up.railway.app'
const DEFAULT_SITE_ORIGIN = 'https://web-production-e9dcd.up.railway.app'

export function getFulfillmentOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_FULFILLMENT_WEB_URL?.trim()
  return (raw || DEFAULT_FULFILLMENT_ORIGIN).replace(/\/$/, '')
}

/** Origin лендинга: в браузере — текущий хост; при сборке — из env или дефолт прод. */
export function getSiteOriginForAuth(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  return (raw || DEFAULT_SITE_ORIGIN).replace(/\/$/, '')
}

function absoluteReturnUrl(returnPath: string): string {
  const path = returnPath.startsWith('/') ? returnPath : `/${returnPath}`
  return `${getSiteOriginForAuth()}${path}`
}

/** Реальный вход на платформе. Добавьте allowlist для returnUrl в Fulfillment. */
export function buildFulfillmentLoginUrl(options: { email?: string; returnPath?: string } = {}): string {
  const returnPath = options.returnPath ?? '/auth/callback'
  const u = new URL(`${getFulfillmentOrigin()}/login`)
  u.searchParams.set('returnUrl', absoluteReturnUrl(returnPath))
  const email = options.email?.trim()
  if (email) {
    u.searchParams.set('email', email)
  }
  return u.toString()
}

export function buildFulfillmentRegisterUrl(options: {
  email?: string
  name?: string
  returnPath?: string
} = {}): string {
  const returnPath = options.returnPath ?? '/auth/callback'
  const u = new URL(`${getFulfillmentOrigin()}/register`)
  u.searchParams.set('returnUrl', absoluteReturnUrl(returnPath))
  const email = options.email?.trim()
  if (email) u.searchParams.set('email', email)
  const name = options.name?.trim()
  if (name) u.searchParams.set('name', name)
  return u.toString()
}

export function fulfillmentForgotPasswordUrl(): string {
  return `${getFulfillmentOrigin()}/forgot-password`
}
