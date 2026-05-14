/**
 * Вход и регистрация на лендинге через HTTP API Fulfillment (другой origin).
 *
 * На стороне Fulfillment нужны публичные POST-эндпоинты и CORS на origin лендинга.
 * Пути и поля тела можно подстроить переменными окружения (см. .env.example).
 */

const DEFAULT_ORIGIN = 'https://fulfillment-web-production.up.railway.app'

export function getFfApiBaseUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_FULFILLMENT_API_URL?.trim() ||
    process.env.NEXT_PUBLIC_FULFILLMENT_WEB_URL?.trim()
  return (raw || DEFAULT_ORIGIN).replace(/\/$/, '')
}

function joinUrl(base: string, path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`
  return `${base}${p}`
}

export function getFfLoginUrl(): string {
  const path = process.env.NEXT_PUBLIC_FF_LOGIN_PATH?.trim() || '/api/auth/login'
  return joinUrl(getFfApiBaseUrl(), path)
}

export function getFfRegisterUrl(): string {
  const path = process.env.NEXT_PUBLIC_FF_REGISTER_PATH?.trim() || '/api/auth/register'
  return joinUrl(getFfApiBaseUrl(), path)
}

type Json = Record<string, unknown>

function pickToken(obj: Json): string | null {
  const v =
    (typeof obj.access_token === 'string' && obj.access_token) ||
    (typeof obj.accessToken === 'string' && obj.accessToken) ||
    (typeof obj.token === 'string' && obj.token)
  return v || null
}

function pickRefresh(obj: Json): string | undefined {
  const v =
    (typeof obj.refresh_token === 'string' && obj.refresh_token) ||
    (typeof obj.refreshToken === 'string' && obj.refreshToken)
  return v || undefined
}

function pickUser(obj: Json): unknown {
  if (obj.user && typeof obj.user === 'object') return obj.user
  if (obj.data && typeof obj.data === 'object' && (obj.data as Json).user) {
    return (obj.data as Json).user
  }
  return undefined
}

export function persistAuthSession(accessToken: string, refreshToken?: string, user?: unknown) {
  if (typeof window === 'undefined') return
  localStorage.setItem('token', accessToken)
  if (refreshToken) localStorage.setItem('refresh_token', refreshToken)
  else localStorage.removeItem('refresh_token')
  if (user !== undefined) {
    try {
      localStorage.setItem('user', JSON.stringify(user))
    } catch {
      localStorage.removeItem('user')
    }
  }
}

function readErrorMessage(status: number, body: Json | null): string {
  if (body) {
    const msg =
      (typeof body.message === 'string' && body.message) ||
      (typeof body.error === 'string' && body.error) ||
      (typeof body.detail === 'string' && body.detail)
    if (msg) return msg
    const errs = body.errors
    if (Array.isArray(errs) && errs.length) {
      return errs.map((e) => (typeof e === 'string' ? e : JSON.stringify(e))).join('; ')
    }
    if (errs && typeof errs === 'object') {
      return Object.entries(errs as Record<string, unknown>)
        .map(([k, v]) => `${k}: ${String(v)}`)
        .join('; ')
    }
  }
  return `Ошибка сервера (${status})`
}

export async function ffLogin(email: string, password: string): Promise<{ ok: true } | { ok: false; message: string }> {
  const emailField = process.env.NEXT_PUBLIC_FF_LOGIN_EMAIL_FIELD?.trim() || 'email'
  const passwordField = process.env.NEXT_PUBLIC_FF_LOGIN_PASSWORD_FIELD?.trim() || 'password'
  const body: Json = { [emailField]: email, [passwordField]: password }

  let res: Response
  try {
    res = await fetch(getFfLoginUrl(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
      credentials: 'omit',
    })
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    if (/Failed to fetch|NetworkError|load failed/i.test(msg)) {
      return {
        ok: false,
        message:
          'Не удалось связаться с сервером. Проверьте CORS на Fulfillment для origin лендинга и URL в NEXT_PUBLIC_FULFILLMENT_API_URL / NEXT_PUBLIC_FF_LOGIN_PATH.',
      }
    }
    return { ok: false, message: msg }
  }

  let json: Json | null = null
  try {
    json = (await res.json()) as Json
  } catch {
    /* empty or non-json */
  }

  if (!res.ok) {
    return { ok: false, message: readErrorMessage(res.status, json) }
  }

  const token = json ? pickToken(json) : null
  if (!token) {
    return {
      ok: false,
      message:
        'Вход выполнен, но в ответе нет токена (access_token / accessToken / token). Настройте разбор ответа или поля на стороне API.',
    }
  }

  persistAuthSession(token, json ? pickRefresh(json) : undefined, json ? pickUser(json) : undefined)
  return { ok: true }
}

export async function ffRegister(
  email: string,
  password: string,
  fullName: string,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const body: Json = {
    email,
    password,
    full_name: fullName,
    name: fullName,
  }

  let res: Response
  try {
    res = await fetch(getFfRegisterUrl(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
      credentials: 'omit',
    })
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    if (/Failed to fetch|NetworkError|load failed/i.test(msg)) {
      return {
        ok: false,
        message:
          'Не удалось связаться с сервером. Проверьте CORS на Fulfillment и URL в NEXT_PUBLIC_FF_REGISTER_PATH.',
      }
    }
    return { ok: false, message: msg }
  }

  let json: Json | null = null
  try {
    json = (await res.json()) as Json
  } catch {
    /* */
  }

  if (!res.ok) {
    return { ok: false, message: readErrorMessage(res.status, json) }
  }

  const token = json ? pickToken(json) : null
  if (token) {
    persistAuthSession(token, json ? pickRefresh(json) : undefined, json ? pickUser(json) : undefined)
  }
  /* Регистрация может не возвращать токен — тогда пользователь идёт во вкладку «Войти». */
  return { ok: true }
}
