'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import {
  buildFulfillmentLoginUrl,
  consumeAuthTransferFromUrl,
} from '@/lib/fulfillment-auth'

type UserProfile = {
  email?: string
  name?: string
}

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<UserProfile | null>(null)
  const [hadAuthTransfer, setHadAuthTransfer] = useState(false)

  useEffect(() => {
    const transferred = consumeAuthTransferFromUrl()
    setHadAuthTransfer(transferred)

    const token = localStorage.getItem('token')
    if (!token) {
      setMounted(true)
      return
    }
    const raw = localStorage.getItem('user')
    if (raw) {
      try {
        setUser(JSON.parse(raw) as UserProfile)
      } catch {
        setUser(null)
      }
    }
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#252064]/5 text-[#252064]">
        <p className="text-sm font-medium text-[#252064]/70">Загрузка…</p>
      </main>
    )
  }

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  if (!token) {
    const loginHref = buildFulfillmentLoginUrl({ returnPath: '/dashboard' })
    return (
      <main className="min-h-screen bg-[#252064]/5 px-4 py-10 text-[#252064] sm:px-8">
        <div className="mx-auto max-w-lg rounded-3xl border border-[#252064]/12 bg-white p-8 shadow-[0_18px_50px_rgba(37,32,100,0.12)]">
          <h1 className="text-2xl font-black tracking-tight">Личный кабинет</h1>
          <p className="mt-2 text-sm text-[#252064]/65">
            {hadAuthTransfer
              ? 'Ссылка возврата не содержит токенов. Войдите на платформе Fulfillment — после входа вас должны перенаправить обратно с параметрами access_token (или token) и при необходимости refresh_token.'
              : 'Войдите через платформу Fulfillment. После успешного входа вы вернётесь на этот сайт, если в приложении Fulfillment настроен редирект на return_url с токенами.'}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={loginHref}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[#E4003C] px-5 text-sm font-bold text-white shadow-[0_12px_24px_rgba(228,0,60,0.22)] transition hover:bg-[#252064]"
            >
              Войти через Fulfillment
            </a>
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-[#252064]/20 px-5 text-sm font-bold text-[#252064] transition hover:bg-[#252064]/5"
            >
              На главную
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#252064]/5 px-4 py-10 text-[#252064] sm:px-8">
      <div className="mx-auto max-w-lg rounded-3xl border border-[#252064]/12 bg-white p-8 shadow-[0_18px_50px_rgba(37,32,100,0.12)]">
        <h1 className="text-2xl font-black tracking-tight">Личный кабинет</h1>
        <p className="mt-2 text-sm text-[#252064]/65">
          Сессия сохранена в этом браузере (токен с площадки Fulfillment после редиректа).
        </p>
        {user ? (
          <ul className="mt-6 space-y-2 text-sm">
            {user.name ? (
              <li>
                <span className="font-semibold">Имя:</span> {user.name}
              </li>
            ) : null}
            {user.email ? (
              <li>
                <span className="font-semibold">Email:</span> {user.email}
              </li>
            ) : null}
          </ul>
        ) : null}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#E4003C] px-5 text-sm font-bold text-white shadow-[0_12px_24px_rgba(228,0,60,0.22)] transition hover:bg-[#252064]"
          >
            На главную
          </Link>
          <a
            href={buildFulfillmentLoginUrl({ returnPath: '/dashboard' })}
            className="inline-flex h-11 items-center justify-center rounded-xl border border-[#252064]/20 px-5 text-sm font-bold text-[#252064] transition hover:bg-[#252064]/5"
          >
            Открыть Fulfillment
          </a>
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-[#252064]/20 px-5 text-sm font-bold text-[#252064] transition hover:bg-[#252064]/5"
            onClick={() => {
              localStorage.removeItem('token')
              localStorage.removeItem('refresh_token')
              localStorage.removeItem('user')
              window.location.assign('/dashboard')
            }}
          >
            Выйти
          </button>
        </div>
      </div>
    </main>
  )
}
