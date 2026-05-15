import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Package, Truck } from 'lucide-react'

import { OServiseOnboardingHost } from '@/components/o-servise-onboarding-host'

export const metadata: Metadata = {
  title: 'О сервисе — Fulfillment',
  description:
    'Фулфилмент и доставка на маркетплейсы: склад, маркировка, оформление поставки и контроль сроков в одном окне.',
}

export default function OServisePage() {
  return (
    <main className="min-h-screen bg-[#252064]/5 px-4 py-10 text-[#252064] sm:px-8">
      <OServiseOnboardingHost />
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#252064]/70 transition hover:text-[#E4003C]"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          На главную
        </Link>

        <div className="rounded-3xl border border-[#252064]/12 bg-white p-8 shadow-[0_18px_50px_rgba(37,32,100,0.12)] sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#252064]/50">FF Logistics</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">О сервисе Fulfillment</h1>
          <p className="mt-4 text-pretty text-base leading-relaxed text-[#252064]/75">
            Мы помогаем брендам и продавцам доставлять товары на маркетплейсы: от оформления поставки и оплаты до
            упаковки, маркировки и отгрузки на склад — с прозрачными сроками и удобным личным кабинетом.
          </p>

          <ul className="mt-8 space-y-4">
            <li className="flex gap-4 rounded-2xl border border-[#252064]/10 bg-[#252064]/[0.03] p-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#252064] text-white">
                <Truck className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-bold">Доставка на WB, Ozon, ЯндексМаркет</p>
                <p className="mt-1 text-sm text-[#252064]/70">
                  Один процесс: расчёт, заявка и сопровождение до приёмки на складе маркетплейса.
                </p>
              </div>
            </li>
            <li className="flex gap-4 rounded-2xl border border-[#252064]/10 bg-[#252064]/[0.03] p-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#E4003C] text-white">
                <Package className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-bold">Склад и маркировка</p>
                <p className="mt-1 text-sm text-[#252064]/70">
                  Упаковка груза и штрихкодирование под требования площадки.
                </p>
              </div>
            </li>
          </ul>

          <div className="mt-10 flex flex-col gap-3">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/#login"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-[#E4003C] px-5 text-sm font-bold text-white shadow-[0_12px_24px_rgba(228,0,60,0.22)] transition hover:bg-[#252064]"
              >
                Сформировать поставку
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-[#252064]/20 px-5 text-sm font-bold text-[#252064] transition hover:bg-[#252064]/5"
              >
                Личный кабинет
              </Link>
            </div>
            <p className="text-sm text-[#252064]/60">
              <Link href="/o-servise?demo=1" className="font-semibold text-[#E4003C] underline-offset-4 hover:underline">
                Показать подсказки по поставкам (демо, без входа)
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
