'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function readParamsFromHash(): URLSearchParams {
  if (typeof window === 'undefined') return new URLSearchParams()
  const raw = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : window.location.hash
  return new URLSearchParams(raw)
}

function AuthCallbackInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [message, setMessage] = useState('Завершение входа…')

  useEffect(() => {
    const hp = readParamsFromHash()
    const fromQuery =
      searchParams.get('token') || searchParams.get('access_token') || searchParams.get('id_token')
    const fromHash = hp.get('access_token') || hp.get('token') || hp.get('id_token')
    const token = fromQuery || fromHash

    if (token) {
      localStorage.setItem('token', token)
      const refresh =
        searchParams.get('refresh_token') || hp.get('refresh_token')
      if (refresh) {
        localStorage.setItem('refresh_token', refresh)
      }
      const emailRaw = searchParams.get('email') || hp.get('email')
      if (emailRaw) {
        try {
          const email = decodeURIComponent(emailRaw)
          localStorage.setItem('user', JSON.stringify({ email }))
        } catch {
          localStorage.setItem('user', JSON.stringify({ email: emailRaw }))
        }
      }
      const err = searchParams.get('error_description') || searchParams.get('error')
      if (err) {
        localStorage.setItem('auth_error', err)
      }
      setMessage('Вход выполнен, перенаправляем…')
      router.replace('/dashboard')
      return
    }

    setMessage('Токен не получен. Перенаправляем на форму входа…')
    const t = window.setTimeout(() => {
      router.replace('/#login')
    }, 800)
    return () => window.clearTimeout(t)
  }, [router, searchParams])

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#252064]/5 px-4 text-[#252064]">
      <p className="text-sm font-medium text-[#252064]/75">{message}</p>
    </main>
  )
}

export function AuthCallbackClient() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#252064]/5 text-[#252064]">
          <p className="text-sm font-medium text-[#252064]/70">Загрузка…</p>
        </main>
      }
    >
      <AuthCallbackInner />
    </Suspense>
  )
}
