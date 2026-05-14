/**
 * Связка лендинга и веб‑приложения Fulfillment (разные origin на Railway).
 *
 * Ожидаемое поведение на стороне Fulfillment (allowlist origin + редирект после входа):
 * - GET /login: query `return_url` (абсолютный URL лендинга), опционально `email`.
 * - GET /register: то же + опционально `full_name`.
 * После успеха — редирект на `return_url` с токенами, например:
 *   ?access_token=…&refresh_token=…  или  #access_token=…
 * (допустим алиас `token` вместо `access_token`).
 *
 * Дополнительно дублируем `returnUrl` (camelCase), если на платформе так принято.
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

/** Реальный вход на платформе. */
export function buildFulfillmentLoginUrl(options: { email?: string; returnPath?: string } = {}): string {
  const returnPath = options.returnPath ?? '/auth/callback'
  const ret = absoluteReturnUrl(returnPath)
  const u = new URL(`${getFulfillmentOrigin()}/login`)
  u.searchParams.set('return_url', ret)
  u.searchParams.set('returnUrl', ret)
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
  const ret = absoluteReturnUrl(returnPath)
  const u = new URL(`${getFulfillmentOrigin()}/register`)
  u.searchParams.set('return_url', ret)
  u.searchParams.set('returnUrl', ret)
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
