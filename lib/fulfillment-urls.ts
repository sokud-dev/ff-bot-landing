/**
 * Ссылки на веб‑приложение Fulfillment (другой origin).
 * Вход/регистрация по API — в `lib/ff-auth-api.ts`; здесь только вспомогательные URL.
 */

const DEFAULT_FULFILLMENT_ORIGIN = 'https://fulfillment-web-production.up.railway.app'

export function getFulfillmentOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_FULFILLMENT_WEB_URL?.trim()
  return (raw || DEFAULT_FULFILLMENT_ORIGIN).replace(/\/$/, '')
}

export function fulfillmentForgotPasswordUrl(): string {
  return `${getFulfillmentOrigin()}/forgot-password`
}
