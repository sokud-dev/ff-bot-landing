'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { Eye, Monitor, Smartphone } from 'lucide-react'

type DeviceMode = 'desktop' | 'phone'

type LegalLinks = {
  joinAgreement: string
  fulfillmentServicesAgreement: string
  personalDataConsent: string
  personalDataPolicy: string
}

type LoginCardProps = {
  legalLinks: LegalLinks
}

const PHONE_PREFIX = '+7'
const PHONE_MASK_PLACEHOLDER = '+7 (___) ___-__-__'
const FULFILLMENT_API_BASE_URL = 'https://fulfillment-api-production-cabe.up.railway.app/api/v1'
const LAST_LOGIN_STORAGE_KEY = 'ff_last_login'
const DEVICE_TYPE_STORAGE_KEY = 'ff_device_type'

type FulfillmentLoginResponse = {
  accessToken?: string
  refreshToken?: string
  user?: {
    role?: string
  }
  message?: string
}

export function LoginCard({ legalLinks }: LoginCardProps) {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop')
  const [loginValue, setLoginValue] = useState('')

  const isPhoneMode = deviceMode === 'phone'

  function selectMode(mode: DeviceMode) {
    setDeviceMode(mode)
    setLoginValue((currentValue) => {
      if (mode === 'phone') {
        return formatPhoneValue(currentValue)
      }

      return currentValue === PHONE_PREFIX ? '' : currentValue
    })
  }

  function handleLoginChange(event: ChangeEvent<HTMLInputElement>) {
    const nextValue = event.target.value
    setLoginValue(isPhoneMode ? formatPhoneValue(nextValue) : nextValue)
  }

  return (
    <div
      className="relative w-full max-w-[760px] justify-self-center overflow-hidden rounded-2xl border border-border bg-card text-foreground shadow-2xl"
      style={{ fontFamily: 'var(--font-sans, Inter, sans-serif)' }}
    >
      <div className="hidden md:flex">
        <div
          className="relative flex w-52 shrink-0 items-center justify-center overflow-hidden"
          style={{ background: '#0B1C3A' }}
        >
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/[.05]" />
          <div className="absolute -bottom-20 -left-12 h-56 w-56 rounded-full border border-white/[.04]" />
          <div className="relative z-10 flex flex-col items-center gap-3 px-4">
            <DeviceModeLabel />
            <DeviceModeButton mode="desktop" activeMode={deviceMode} onSelect={selectMode} variant="desktop" />
            <DeviceModeButton mode="phone" activeMode={deviceMode} onSelect={selectMode} variant="desktop" />
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center bg-card p-10">
          <h1 className="mb-1 text-xl font-bold text-foreground">Вход в систему</h1>
          <p className="mb-7 text-sm text-muted-foreground">Введите ваши данные</p>
          <LoginMaskForm
            isPhoneMode={isPhoneMode}
            loginValue={loginValue}
            legalLinks={legalLinks}
            onLoginChange={handleLoginChange}
          />
          <RegisterLink className="mt-6" />
        </div>
      </div>

      <div className="flex min-h-[560px] w-full flex-col md:hidden">
        <div className="relative overflow-hidden px-6 pb-12 pt-12" style={{ background: '#0B1C3A' }}>
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/[.05]" />
          <div className="relative z-10">
            <DeviceModeLabel className="mb-4 text-center" />
            <div className="flex gap-3">
              <DeviceModeButton mode="desktop" activeMode={deviceMode} onSelect={selectMode} variant="mobile" />
              <DeviceModeButton mode="phone" activeMode={deviceMode} onSelect={selectMode} variant="mobile" />
            </div>
          </div>
        </div>
        <div className="-mt-4 flex-1 rounded-t-3xl bg-card px-6 pb-10 pt-8">
          <h1 className="mb-6 text-lg font-bold text-foreground">Вход</h1>
          <LoginMaskForm
            isPhoneMode={isPhoneMode}
            loginValue={loginValue}
            legalLinks={legalLinks}
            onLoginChange={handleLoginChange}
          />
          <RegisterLink className="mt-5" />
        </div>
      </div>
    </div>
  )
}

function DeviceModeLabel({ className = 'mb-2' }: { className?: string }) {
  return (
    <p
      className={`${className} text-[9.5px] font-semibold uppercase tracking-widest`}
      style={{ color: 'rgba(255,255,255,.28)' }}
    >
      Режим устройства
    </p>
  )
}

function DeviceModeButton({
  mode,
  activeMode,
  onSelect,
  variant,
}: {
  mode: DeviceMode
  activeMode: DeviceMode
  onSelect: (mode: DeviceMode) => void
  variant: 'desktop' | 'mobile'
}) {
  const isActive = mode === activeMode
  const Icon = mode === 'desktop' ? Monitor : Smartphone
  const label = mode === 'desktop' ? 'Компьютер' : 'Телефон'
  const iconColor = isActive ? '#fff' : 'rgba(255,255,255,.38)'
  const textColor = isActive ? '#fff' : 'rgba(255,255,255,.42)'
  const className =
    variant === 'desktop'
      ? 'flex w-28 flex-col items-center gap-2 rounded-xl py-4 transition-all'
      : 'flex flex-1 flex-col items-center gap-2 rounded-xl py-3.5 transition-all'

  return (
    <button
      type="button"
      aria-pressed={isActive}
      className={className}
      style={{
        border: isActive ? '1.5px solid rgba(255,255,255,.3)' : '1.5px solid rgba(255,255,255,.08)',
        background: isActive ? 'rgba(255,255,255,.1)' : 'rgba(255,255,255,.04)',
      }}
      onClick={() => onSelect(mode)}
    >
      <Icon className={variant === 'desktop' ? 'size-[26px]' : 'size-6'} color={iconColor} aria-hidden="true" />
      <span className={variant === 'desktop' ? 'text-xs font-medium' : 'text-xs'} style={{ color: textColor }}>
        {label}
      </span>
      {isActive ? (
        <div className={variant === 'desktop' ? 'h-[3px] w-6 rounded-full bg-red-500' : 'h-[3px] w-5 rounded-full bg-red-500'} />
      ) : null}
    </button>
  )
}

function LoginMaskForm({
  isPhoneMode,
  loginValue,
  legalLinks,
  onLoginChange,
}: {
  isPhoneMode: boolean
  loginValue: string
  legalLinks: LegalLinks
  onLoginChange: (event: ChangeEvent<HTMLInputElement>) => void
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitError('')

    const formData = new FormData(event.currentTarget)
    const login = loginValue.trim()
    const password = String(formData.get('password_field') ?? '')

    if (!login) {
      setSubmitError('Введите email или телефон')
      return
    }

    if (!password) {
      setSubmitError('Введите пароль')
      return
    }

    setIsSubmitting(true)

    try {
      const authData = await loginToFulfillmentApp(login, password)

      localStorage.setItem('token', authData.accessToken)
      if (authData.refreshToken) {
        localStorage.setItem('refresh_token', authData.refreshToken)
      }
      if (authData.user) {
        localStorage.setItem('user', JSON.stringify(authData.user))
      }
      localStorage.setItem(LAST_LOGIN_STORAGE_KEY, login)
      localStorage.setItem(DEVICE_TYPE_STORAGE_KEY, isPhoneMode ? 'mobile' : 'desktop')

      window.location.assign(authData.user?.role === 'PLATFORM_ADMIN' ? '/platform' : '/dashboard')
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Не удалось выполнить вход')
      setIsSubmitting(false)
    }
  }

  return (
    <form autoComplete="off" className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input type="text" style={{ display: 'none' }} readOnly name="fake_user" />
      <input type="password" style={{ display: 'none' }} readOnly name="fake_pass" />
      <div>
        <label className="mb-1.5 block text-[10.5px] font-semibold uppercase tracking-widest text-muted-foreground">
          {isPhoneMode ? 'Телефон' : 'Телефон или Email'}
        </label>
        <div className="relative">
          <input
            type={isPhoneMode ? 'tel' : 'text'}
            inputMode={isPhoneMode ? 'tel' : 'email'}
            placeholder={isPhoneMode ? PHONE_MASK_PLACEHOLDER : 'admin@fulfillment.ru'}
            autoComplete={isPhoneMode ? 'tel' : 'off'}
            className="h-11 w-full rounded-xl border border-border bg-card px-3.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/15"
            name="login_field"
            value={loginValue}
            required
            onChange={onLoginChange}
          />
        </div>
      </div>
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label className="text-[10.5px] font-semibold uppercase tracking-widest text-muted-foreground">Пароль</label>
          <a className="text-xs text-primary hover:underline" href="https://fulfillment-web-production.up.railway.app/forgot-password">
            Забыли пароль?
          </a>
        </div>
        <div>
          <div className="relative">
            <input
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              className="h-11 w-full rounded-xl border border-border bg-card px-3.5 pr-11 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/15"
              name="password_field"
              defaultValue=""
              required
            />
            <div className="absolute right-0 top-0 flex h-full items-center pr-3">
              <button
                type="button"
                tabIndex={-1}
                className="flex size-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
              >
                <Eye className="size-[15px]" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <fieldset className="flex flex-col gap-3">
        <legend className="sr-only">Юридические согласия</legend>

        <label className="flex items-start gap-3 text-xs leading-relaxed text-muted-foreground">
          <input
            name="accept_join_terms"
            type="checkbox"
            required
            className="mt-0.5 size-4 shrink-0 rounded border-border accent-[#D42B2B]"
          />
          <span>
            Я принимаю условия и тарифы присоединения к фулфилменту{' '}
            <a
              href={legalLinks.joinAgreement}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline underline-offset-4 transition hover:text-foreground"
            >
              Соглашение о присоединении
            </a>
            {' и '}
            <a
              href={legalLinks.fulfillmentServicesAgreement}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline underline-offset-4 transition hover:text-foreground"
            >
              Договор оказания услуг фулфилмента
            </a>
          </span>
        </label>

        <label className="flex items-start gap-3 text-xs leading-relaxed text-muted-foreground">
          <input
            name="accept_personal_data"
            type="checkbox"
            required
            className="mt-0.5 size-4 shrink-0 rounded border-border accent-[#D42B2B]"
          />
          <span>
            Я принимаю соглашение на обработку персональных данных согласно политике конфиденциальности{' '}
            <a
              href={legalLinks.personalDataConsent}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline underline-offset-4 transition hover:text-foreground"
            >
              Согласие на обработку персональных данных
            </a>
            {' и '}
            <a
              href={legalLinks.personalDataPolicy}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline underline-offset-4 transition hover:text-foreground"
            >
              Политика в отношении обработки персональных данных
            </a>
          </span>
        </label>
      </fieldset>
      {submitError ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive">
          {submitError}
        </div>
      ) : null}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 h-11 w-full rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-60"
        style={{ backgroundColor: '#D42B2B' }}
      >
        {isSubmitting ? 'Входим...' : 'Войти'}
      </button>
    </form>
  )
}

async function loginToFulfillmentApp(login: string, password: string) {
  const response = await fetch(`${FULFILLMENT_API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ login, password }),
  })

  const data = (await response.json().catch(() => ({}))) as FulfillmentLoginResponse

  if (!response.ok) {
    throw new Error(getLoginErrorMessage(data.message, response.status))
  }

  if (!data.accessToken) {
    throw new Error('Не удалось получить токен авторизации')
  }

  return data as FulfillmentLoginResponse & { accessToken: string }
}

function getLoginErrorMessage(message: string | undefined, status: number) {
  if (message && message !== 'Internal Server Error' && message !== 'Internal server error') {
    return message
  }

  if (status === 500) {
    return 'Ошибка сервера. Попробуйте ещё раз или обратитесь в поддержку.'
  }

  return 'Неверный логин или пароль'
}

function RegisterLink({ className }: { className: string }) {
  return (
    <p className={`${className} text-center text-sm text-muted-foreground`}>
      Нет аккаунта?{' '}
      <a className="font-medium text-primary hover:underline" href="https://fulfillment-web-production.up.railway.app/register">
        Зарегистрироваться
      </a>
    </p>
  )
}

function formatPhoneValue(value: string) {
  let digits = value.replace(/\D/g, '')

  if (digits.startsWith('8')) {
    digits = `7${digits.slice(1)}`
  }

  if (digits.startsWith('7')) {
    digits = digits.slice(1)
  }

  digits = digits.slice(0, 10)

  if (!digits) {
    return PHONE_PREFIX
  }

  const parts = [
    digits.slice(0, 3),
    digits.slice(3, 6),
    digits.slice(6, 8),
    digits.slice(8, 10),
  ]

  let formattedValue = `${PHONE_PREFIX} (${parts[0]}`

  if (parts[0].length === 3) {
    formattedValue += ')'
  }

  if (parts[1]) {
    formattedValue += ` ${parts[1]}`
  }

  if (parts[2]) {
    formattedValue += `-${parts[2]}`
  }

  if (parts[3]) {
    formattedValue += `-${parts[3]}`
  }

  return formattedValue
}
