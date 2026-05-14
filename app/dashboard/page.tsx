'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { getFulfillmentOrigin } from '@/lib/fulfillment-urls'

type UserProfile = {
  email?: string
  name?: string
}

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<UserProfile | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      window.location.assign('/#login')
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

  return (
    <main className="min-h-screen bg-[#252064]/5 px-4 py-10 text-[#252064] sm:px-8">
      <div className="mx-auto max-w-lg rounded-3xl border border-[#252064]/12 bg-white p-8 shadow-[0_18px_50px_rgba(37,32,100,0.12)]">
        <h1 className="text-2xl font-black tracking-tight">Личный кабинет</h1>
        <p className="mt-2 text-sm text-[#252064]/65">
          Вы вошли через форму на лендинге. Полный функционал — в приложении Fulfillment.
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
            href={`${getFulfillmentOrigin()}/`}
            target="_blank"
            rel="noopener noreferrer"
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
              window.location.assign('/#login')
            }}
          >
            Выйти
          </button>
        </div>
      </div>
    </main>
  )
}
