'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { ffLogin, ffRegister } from '@/lib/ff-auth-api'
import { fulfillmentForgotPasswordUrl } from '@/lib/fulfillment-urls'
import { Spinner } from '@/components/ui/spinner'

type LegalLinks = {
  joinAgreement: string
  fulfillmentServicesAgreement: string
  personalDataConsent: string
  personalDataPolicy: string
}

type LoginCardProps = {
  legalLinks: LegalLinks
}

type LoginFlow = 'auth' | 'registration'

const LAST_LOGIN_STORAGE_KEY = 'ff_last_login'

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export function LoginCard({ legalLinks }: LoginCardProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loginValue, setLoginValue] = useState('')
  const [loginFlow, setLoginFlow] = useState<LoginFlow>('auth')

  useEffect(() => {
    if (searchParams.get('register') === '1') {
      setLoginFlow('registration')
    }
  }, [searchParams])

  useEffect(() => {
    try {
      const last = localStorage.getItem(LAST_LOGIN_STORAGE_KEY)
      if (last && isValidEmail(last)) {
        setLoginValue(last)
      }
    } catch {
      /* ignore */
    }
  }, [])

  function handleLoginChange(event: ChangeEvent<HTMLInputElement>) {
    setLoginValue(event.target.value)
  }

  return (
    <div
      className="relative w-full max-w-[520px] justify-self-center overflow-hidden rounded-3xl border border-[#252064]/12 bg-white p-6 text-[#252064] shadow-[0_18px_50px_rgba(37,32,100,0.12)] sm:p-10"
      style={{ fontFamily: 'var(--font-sans, Inter, sans-serif)' }}
    >
      <h1 className="mb-1 text-xl font-black tracking-tight text-[#252064] sm:text-2xl">Вход в систему</h1>
      <p className="mb-6 text-sm text-[#252064]/65">
        {loginFlow === 'auth'
          ? 'Введите email и пароль — запрос уходит в API Fulfillment (см. переменные NEXT_PUBLIC_FF_*).'
          : 'Зарегистрируйтесь здесь; данные отправляются в API Fulfillment.'}
      </p>
      <LoginFlowToggle activeFlow={loginFlow} onChange={setLoginFlow} className="mb-8" />
      <LoginMaskForm
        flow={loginFlow}
        loginValue={loginValue}
        legalLinks={legalLinks}
        onLoginChange={handleLoginChange}
        onSwitchToAuth={() => setLoginFlow('auth')}
        onAuthSuccess={() => router.push('/dashboard')}
      />
      {loginFlow === 'registration' ? <RegisterLink className="mt-6" /> : null}
    </div>
  )
}

function LoginFlowToggle({
  activeFlow,
  onChange,
  className = '',
}: {
  activeFlow: LoginFlow
  onChange: (flow: LoginFlow) => void
  className?: string
}) {
  return (
    <div
      className={`flex rounded-2xl border border-[#252064]/12 bg-[#252064]/[0.04] p-1 ${className}`}
      role="tablist"
      aria-label="Тип входа"
    >
      <button
        type="button"
        role="tab"
        aria-selected={activeFlow === 'auth'}
        className={`flex-1 rounded-xl px-3 py-2.5 text-center text-sm font-bold transition-all ${
          activeFlow === 'auth'
            ? 'bg-white text-[#252064] shadow-sm ring-1 ring-[#252064]/10'
            : 'text-[#252064]/55 hover:text-[#252064]'
        }`}
        onClick={() => onChange('auth')}
      >
        Войти в ЛК
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={activeFlow === 'registration'}
        className={`flex-1 rounded-xl px-3 py-2.5 text-center text-sm font-bold transition-all ${
          activeFlow === 'registration'
            ? 'bg-white text-[#252064] shadow-sm ring-1 ring-[#252064]/10'
            : 'text-[#252064]/55 hover:text-[#252064]'
        }`}
        onClick={() => onChange('registration')}
      >
        Регистрация
      </button>
    </div>
  )
}

function LoginMaskForm({
  flow,
  loginValue,
  legalLinks,
  onLoginChange,
  onSwitchToAuth,
  onAuthSuccess,
}: {
  flow: LoginFlow
  loginValue: string
  legalLinks: LegalLinks
  onLoginChange: (event: ChangeEvent<HTMLInputElement>) => void
  onSwitchToAuth: () => void
  onAuthSuccess: () => void
}) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [successInfo, setSuccessInfo] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitError('')
    setSuccessInfo('')

    const formData = new FormData(event.currentTarget)
    const login = loginValue.trim()
    const password = String(formData.get('password_field') ?? '')

    if (!login) {
      setSubmitError('Введите email')
      return
    }

    if (!isValidEmail(login)) {
      setSubmitError('Некорректный email')
      return
    }

    if (!password) {
      setSubmitError('Введите пароль')
      return
    }

    if (password.length < 6) {
      setSubmitError('Пароль не короче 6 символов')
      return
    }

    if (flow === 'registration') {
      const name = String(formData.get('full_name') ?? '').trim()
      if (!name) {
        setSubmitError('Введите имя')
        return
      }
    }

    setIsSubmitting(true)

    try {
      localStorage.setItem(LAST_LOGIN_STORAGE_KEY, login)
    } catch {
      /* ignore */
    }

    if (flow === 'auth') {
      const result = await ffLogin(login, password)
      setIsSubmitting(false)
      if (!result.ok) {
        setSubmitError(result.message)
        return
      }
      onAuthSuccess()
      return
    }

    const name = String(formData.get('full_name') ?? '').trim()
    const result = await ffRegister(login, password, name)
    setIsSubmitting(false)
    if (!result.ok) {
      setSubmitError(result.message)
      return
    }
    try {
      const t = localStorage.getItem('token')
      if (t) {
        router.push('/dashboard')
        return
      }
    } catch {
      /* */
    }
    setSuccessInfo('Аккаунт создан. Войдите с тем же email и паролем во вкладке «Войти в ЛК».')
    onSwitchToAuth()
    router.replace('/#login')
  }

  const inputClassName =
    'h-11 w-full rounded-xl border border-[#252064]/15 bg-white px-3.5 text-sm text-[#252064] outline-none transition-all placeholder:text-[#252064]/35 focus:border-[#E4003C] focus:ring-2 focus:ring-[#E4003C]/15'

  return (
    <form autoComplete="on" className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <label className="mb-1.5 block text-[10.5px] font-bold uppercase tracking-widest text-[#252064]/55">
          Email
        </label>
        <input
          type="email"
          inputMode="email"
          placeholder="you@company.ru"
          autoComplete="email"
          className={inputClassName}
          name="login_field"
          value={loginValue}
          required
          onChange={onLoginChange}
        />
      </div>
      {flow === 'registration' ? (
        <div>
          <label className="mb-1.5 block text-[10.5px] font-bold uppercase tracking-widest text-[#252064]/55">
            Имя
          </label>
          <input
            type="text"
            name="full_name"
            placeholder="Иван Иванов"
            autoComplete="name"
            className={inputClassName}
            required
          />
        </div>
      ) : null}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label className="text-[10.5px] font-bold uppercase tracking-widest text-[#252064]/55">Пароль</label>
          {flow === 'auth' ? (
            <a
              className="text-xs font-semibold text-[#E4003C] underline-offset-4 hover:underline"
              href={fulfillmentForgotPasswordUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Забыли пароль?
            </a>
          ) : (
            <span className="text-[10.5px] font-bold uppercase tracking-widest text-[#252064]/35">Мин. 6 символов</span>
          )}
        </div>
        <input
          type="password"
          placeholder="••••••••"
          autoComplete={flow === 'registration' ? 'new-password' : 'current-password'}
          className={inputClassName}
          name="password_field"
          required
          minLength={6}
        />
      </div>
      {flow === 'registration' ? (
        <>
          <fieldset className="flex flex-col gap-3">
            <legend className="sr-only">Юридические согласия</legend>

            <label className="flex items-start gap-3 text-xs leading-relaxed text-[#252064]/75">
              <input
                name="accept_join_terms"
                type="checkbox"
                required
                className="mt-0.5 size-4 shrink-0 rounded border-[#252064]/25 accent-[#E4003C]"
              />
              <span>
                Я принимаю условия и тарифы присоединения к фулфилменту{' '}
                <a
                  href={legalLinks.joinAgreement}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#E4003C] underline underline-offset-4 transition hover:text-[#252064]"
                >
                  Соглашение о присоединении
                </a>
                {' и '}
                <a
                  href={legalLinks.fulfillmentServicesAgreement}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#E4003C] underline underline-offset-4 transition hover:text-[#252064]"
                >
                  Договор оказания услуг фулфилмента
                </a>
              </span>
            </label>

            <label className="flex items-start gap-3 text-xs leading-relaxed text-[#252064]/75">
              <input
                name="accept_personal_data"
                type="checkbox"
                required
                className="mt-0.5 size-4 shrink-0 rounded border-[#252064]/25 accent-[#E4003C]"
              />
              <span>
                Я принимаю соглашение на обработку персональных данных согласно политике конфиденциальности{' '}
                <a
                  href={legalLinks.personalDataConsent}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#E4003C] underline underline-offset-4 transition hover:text-[#252064]"
                >
                  Согласие на обработку персональных данных
                </a>
                {' и '}
                <a
                  href={legalLinks.personalDataPolicy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#E4003C] underline underline-offset-4 transition hover:text-[#252064]"
                >
                  Политика в отношении обработки персональных данных
                </a>
              </span>
            </label>
          </fieldset>

          <div className="flex flex-col gap-2 rounded-xl border border-[#252064]/10 bg-[#252064]/[0.03] px-4 py-3">
            <p className="text-center text-xs leading-relaxed text-[#252064]/65">
              Уже есть аккаунт и нужен только вход в личный кабинет?
            </p>
            <button
              type="button"
              className="h-10 w-full rounded-lg border border-[#252064]/12 bg-white text-sm font-bold text-[#252064] shadow-sm transition-colors hover:bg-[#252064]/5"
              onClick={onSwitchToAuth}
            >
              Авторизоваться
            </button>
          </div>
        </>
      ) : null}
      {submitError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
          {submitError}
        </div>
      ) : null}
      {successInfo ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-sm text-emerald-900">
          {successInfo}
        </div>
      ) : null}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#E4003C] text-sm font-bold text-white shadow-[0_12px_24px_rgba(228,0,60,0.22)] transition-opacity hover:bg-[#252064] disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Spinner className="size-4 text-white" />
            {flow === 'auth' ? 'Входим…' : 'Регистрация…'}
          </>
        ) : flow === 'auth' ? (
          'Авторизоваться'
        ) : (
          'Зарегистрироваться'
        )}
      </button>
    </form>
  )
}

function RegisterLink({ className }: { className: string }) {
  return (
    <p className={`${className} text-center text-sm text-[#252064]/65`}>
      Нет аккаунта?{' '}
      <a className="font-semibold text-[#E4003C] underline-offset-4 hover:underline" href="/?register=1#login">
        Открыть регистрацию
      </a>
    </p>
  )
}
