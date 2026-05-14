'use client'

import { useEffect } from 'react'

import { getFulfillmentLoginPageUrl } from '@/lib/fulfillment-urls'

/**
 * ЛК на лендинге не дублируем: сразу отправляем в веб‑приложение Fulfillment.
 */
export default function DashboardPage() {
  useEffect(() => {
    window.location.replace(getFulfillmentLoginPageUrl())
  }, [])

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#252064]/5 text-[#252064]">
      <p className="text-sm font-medium text-[#252064]/70">Переход в приложение…</p>
    </main>
  )
}
