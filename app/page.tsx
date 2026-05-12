import { Suspense } from 'react'
import {
  ArrowRight,
  Box,
  Calculator,
  FileText,
  PackageCheck,
  Phone,
  RefreshCcw,
  ShieldCheck,
  Store,
  Truck,
  Wallet,
} from 'lucide-react'
import Image from 'next/image'

import { FboMiniappSection } from '../components/fbo-miniapp-section'
import { LoginCard } from '../components/login-card'

const LEGAL_LINKS = {
  joinAgreement: '/documents/ПЭК_Соглашение о присоединении к договору оказания услуг Фулфилмента.docx',
  fulfillmentServicesAgreement: '/documents/Договор присоединения_фулфилмент.docx',
  personalDataConsent: '/documents/Согласие на обработку персональных данных Пользователя веб-сервисов.docx',
  personalDataPolicy: '/documents/Политика_обработки_персональных_данных_v8.docx',
} as const

const MARKETPLACES = ['Wildberries', 'Ozon', 'Яндекс Маркет'] as const

const ROUTE_STEPS = [
  'Оформление поставки',
  'Оплата',
  'Упаковка груза и маркировка штрихкодом',
  'Отгрузка на склад',
] as const

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#252064]/5 text-[#252064]">
      <div className="flex w-full flex-col gap-12 px-4 py-6 sm:px-6 sm:py-10">
        <section className="relative overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_80px_rgba(37,32,100,0.16)]">
          <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[#252064] lg:block" aria-hidden="true" />
          <div
            className="absolute -right-24 top-0 hidden h-full w-[58%] skew-x-[-12deg] bg-[#252064] lg:block"
            aria-hidden="true"
          />
          <div
            className="absolute right-8 top-8 hidden h-24 w-24 rounded-full border-[18px] border-white/20 lg:block"
            aria-hidden="true"
          />

          <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-12">
            <div className="flex flex-col justify-center gap-7 lg:pr-10 xl:pr-14">
              <div className="inline-flex w-fit items-center gap-3 rounded-full bg-[#252064]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#252064]">
                <span className="size-2 rounded-full bg-[#252064]" aria-hidden="true" />
                Фулфилмент · B2B логистика
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="max-w-3xl text-balance text-4xl font-black leading-[0.98] tracking-tight text-[#252064] sm:text-6xl lg:text-7xl">
                  Доставка до маркетплейсов
                </h1>
                <p className="max-w-2xl text-pretty text-lg leading-relaxed text-[#252064] sm:text-xl lg:max-w-lg">
                  Доставим ваши товары на Wildberries, Ozon, Яндекс Маркет в срок в два клика
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#login"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#E4003C] px-6 text-sm font-bold text-white shadow-[0_12px_24px_rgba(228,0,60,0.28)] transition hover:bg-[#252064]"
                >
                  Оформить заявку
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
                <a
                  href="tel:+74956400102"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#252064]/20 bg-white px-6 text-sm font-bold text-[#252064] transition hover:border-[#252064]/40 hover:bg-[#252064]/5"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  +7 (495) 640-01-02
                </a>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {MARKETPLACES.map((marketplace) => (
                  <MarketplaceCard key={marketplace} title={marketplace} />
                ))}
              </div>
            </div>

            <div className="relative min-h-[420px] overflow-hidden rounded-[1.5rem] bg-[#252064] p-5 text-white lg:bg-transparent lg:p-0">
              <div
                className="absolute inset-0 bg-[linear-gradient(135deg,rgba(37,32,100,0.92),rgba(37,32,100,0.72))] lg:hidden"
                aria-hidden="true"
              />
              <div className="relative flex h-full min-h-[380px] flex-col justify-between rounded-[1.35rem] border border-white/20 bg-white/10 p-5 backdrop-blur">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">FF Logistics</p>
                    <p className="mt-2 text-2xl font-black">Склад + доставка в одном окне</p>
                  </div>
                  <div className="rounded-2xl bg-white p-3 text-[#252064] shadow-lg">
                    <Truck className="size-8" aria-hidden="true" />
                  </div>
                </div>

                <div className="my-8 grid gap-4 sm:grid-cols-2">
                  {ROUTE_STEPS.map((step, index) => (
                    <div
                      key={step}
                      className={`relative rounded-2xl bg-white px-4 py-3.5 text-[#252064] shadow-sm ${
                        index === 2 ? 'sm:col-start-2' : index === 3 ? 'sm:col-start-1 sm:row-start-2' : ''
                      }`}
                    >
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[#252064]/55">
                          Шаг {index + 1}
                        </span>
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#252064] text-sm font-black text-white">
                          {index + 1}
                        </span>
                      </div>
                      <p className="text-sm font-black leading-snug">{step}</p>
                      {index < ROUTE_STEPS.length - 1 ? (
                        <ArrowRight
                          className={`absolute z-10 hidden size-5 rounded-full bg-[#252064] p-1 text-white shadow-md sm:block ${
                            index === 1
                              ? '-bottom-3 left-1/2 -translate-x-1/2 rotate-90'
                              : index === 2
                                ? 'left-[-1.1rem] top-1/2 -translate-y-1/2 rotate-180'
                                : 'right-[-1.1rem] top-1/2 -translate-y-1/2'
                          }`}
                          aria-hidden="true"
                        />
                      ) : null}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white p-4 text-[#252064]">
                    <PackageCheck className="mb-3 size-6 text-[#252064]" aria-hidden="true" />
                    <p className="text-sm font-bold leading-snug">Маркировка и упаковка</p>
                  </div>
                  <div className="rounded-2xl bg-[#252064] p-4 text-white">
                    <ShieldCheck className="mb-3 size-6" aria-hidden="true" />
                    <p className="text-sm font-bold leading-snug">Контроль сроков поставки</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-5 rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_rgba(37,32,100,0.1)] sm:p-8">
          <h2 className="text-center text-3xl font-black tracking-tight text-[#252064] sm:text-5xl">
            Преимущества работы с нами
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              illustration="calculator"
              lead="Быстро и онлайн"
              title="Расчет стоимости в калькуляторе и оформление поставки на маркетплейс. Без менеджера и ожидания"
            />
            <FeatureCard
              illustration="cycle"
              lead="Все в одном окне"
              title="Полный цикл: от оформления заявки до отслеживания груза с простым документооборотом"
            />
            <FeatureCard
              illustration="payment"
              lead="Удобная оплата"
              title="Автопополнение баланса с онлайн-кассой — настрой лимит, плати доставку автоматически, без простоев в логистике"
            />
          </div>
        </section>

        <FboMiniappSection />

        <section
          id="login"
          className="relative isolate flex flex-col items-center gap-6 overflow-hidden rounded-[2rem] bg-white p-6 text-[#252064] shadow-[0_18px_50px_rgba(37,32,100,0.1)] sm:p-8"
        >
          <h2 className="relative text-center text-3xl font-black tracking-tight text-[#252064] sm:text-5xl">
            Оформи заявку прямо сейчас!
          </h2>
          <div className="relative grid w-full max-w-6xl items-center gap-6 lg:grid-cols-[0.65fr_1.35fr]">
            <div className="relative min-h-[220px] overflow-hidden rounded-3xl border border-[#252064]/12 bg-[#252064]/[0.04] shadow-sm sm:min-h-[280px] lg:h-full">
              <Image
                src="/fulfillment-workers-pek-uniforms.png"
                alt="Сотрудники склада в форме с логотипом ПЭК принимают, сортируют и упаковывают груз"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <Suspense
              fallback={
                <div className="relative flex min-h-[320px] w-full max-w-[520px] justify-self-center items-center justify-center overflow-hidden rounded-3xl border border-[#252064]/12 bg-white px-6 text-center text-sm font-semibold text-[#252064]/70">
                  Загрузка формы…
                </div>
              }
            >
              <LoginCard legalLinks={LEGAL_LINKS} />
            </Suspense>
          </div>
        </section>

        <footer className="overflow-hidden rounded-3xl border border-[#252064]/15 bg-white shadow-sm">
          <div className="h-2 w-full bg-[linear-gradient(90deg,#E4003C_0%,#E4003C_34%,#252064_34%,#252064_100%)]" />
          <div className="flex flex-col gap-3 px-5 py-6 text-sm text-[#252064]/70 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <p className="font-medium text-[#252064]">© {new Date().getFullYear()} Fulfillment. Все права защищены.</p>
              <p className="flex flex-wrap items-center gap-2">
                Контакты:{' '}
                <a
                  href="tel:+74956400102"
                  className="inline-flex items-center gap-2 rounded-full bg-[#E4003C] px-3 py-1.5 font-semibold text-white shadow-sm transition hover:bg-[#252064]"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  +7 (495) 640-01-02
                </a>
              </p>
            </div>
            <nav className="flex flex-col gap-2">
              <p className="inline-flex w-fit items-center gap-2 rounded-full bg-[#252064] px-3 py-1.5 font-semibold text-white shadow-sm">
                <FileText className="size-4" aria-hidden="true" />
                Документы
              </p>
              <div className="flex flex-wrap gap-x-3 gap-y-2">
                <a
                  href={LEGAL_LINKS.joinAgreement}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#252064] underline underline-offset-4 transition hover:text-[#E4003C]"
                >
                  Соглашение о присоединении
                </a>
                <a
                  href={LEGAL_LINKS.fulfillmentServicesAgreement}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#252064] underline underline-offset-4 transition hover:text-[#E4003C]"
                >
                  Договор фулфилмента
                </a>
                <a
                  href={LEGAL_LINKS.personalDataPolicy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#252064] underline underline-offset-4 transition hover:text-[#E4003C]"
                >
                  Политика ПДн
                </a>
              </div>
            </nav>
          </div>
        </footer>
      </div>
    </main>
  )
}

function FeatureCard({
  illustration,
  lead,
  title,
}: {
  illustration: 'calculator' | 'cycle' | 'payment'
  lead?: string
  title: string
}) {
  return (
    <div className="group relative min-h-[270px] overflow-hidden rounded-3xl border border-[#252064]/15 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_20%_20%,rgba(228,0,60,0.16),transparent_34%),linear-gradient(135deg,rgba(37,32,100,0.08),rgba(228,0,60,0.06))]" aria-hidden="true" />
      <div className="absolute right-0 top-0 h-full w-2 bg-[#E4003C]" aria-hidden="true" />
      <div
        className={`relative mb-5 flex items-center gap-3 sm:gap-4 ${lead ? 'justify-between' : 'justify-end'}`}
      >
        {lead ? (
          <p className="min-w-0 flex-1 text-balance text-left text-xl font-black leading-tight tracking-tight text-[#252064] sm:text-2xl">
            {lead}
          </p>
        ) : null}
        <FeatureIllustration type={illustration} />
      </div>
      <p className="relative pr-3 text-pretty text-lg font-semibold leading-relaxed text-[#252064]/80">{title}</p>
    </div>
  )
}

function FeatureIllustration({ type }: { type: 'calculator' | 'cycle' | 'payment' }) {
  if (type === 'calculator') {
    return (
      <div className="relative h-24 w-28 shrink-0 rounded-[1.4rem] bg-[#252064] p-3 text-white shadow-[0_14px_28px_rgba(37,32,100,0.18)]">
        <div className="mb-3 flex items-center justify-between">
          <span className="h-2 w-12 rounded-full bg-white/80" />
          <Calculator className="size-4 text-[#E4003C]" aria-hidden="true" />
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {Array.from({ length: 9 }).map((_, index) => (
            <span
              key={index}
              className={index === 8 ? 'h-4 rounded bg-[#E4003C]' : 'h-4 rounded bg-white/20'}
              aria-hidden="true"
            />
          ))}
        </div>
        <div className="absolute -bottom-3 -left-3 rounded-2xl bg-white px-3 py-2 text-xs font-black text-[#E4003C] shadow-md">
          ₽ 0
        </div>
      </div>
    )
  }

  if (type === 'cycle') {
    return (
      <div className="relative h-24 w-28 shrink-0 rounded-[1.4rem] border border-[#252064]/10 bg-white p-3 shadow-[0_14px_28px_rgba(37,32,100,0.12)]">
        <div className="absolute inset-4 rounded-full border-2 border-dashed border-[#252064]/25" aria-hidden="true" />
        <div className="absolute left-3 top-4 flex size-9 items-center justify-center rounded-2xl bg-[#E4003C] text-white shadow-sm">
          <PackageCheck className="size-5" aria-hidden="true" />
        </div>
        <div className="absolute bottom-4 right-3 flex size-9 items-center justify-center rounded-2xl bg-[#252064] text-white shadow-sm">
          <Truck className="size-5" aria-hidden="true" />
        </div>
        <RefreshCcw className="absolute right-4 top-3 size-5 text-[#E4003C]" aria-hidden="true" />
      </div>
    )
  }

  return (
    <div className="relative h-24 w-28 shrink-0 rounded-[1.4rem] bg-[#E4003C] p-3 text-white shadow-[0_14px_28px_rgba(228,0,60,0.2)]">
      <div className="mb-3 flex items-center justify-between">
        <Wallet className="size-5" aria-hidden="true" />
        <span className="rounded-full bg-white/20 px-2 py-1 text-[10px] font-black uppercase tracking-wider">auto</span>
      </div>
      <div className="space-y-2">
        <span className="block h-2 w-16 rounded-full bg-white/80" />
        <span className="block h-2 w-20 rounded-full bg-white/35" />
      </div>
      <div className="absolute -bottom-3 -right-3 flex size-10 items-center justify-center rounded-2xl bg-white text-[#252064] shadow-md">
        <RefreshCcw className="size-5" aria-hidden="true" />
      </div>
    </div>
  )
}

function MarketplaceCard({ title }: { title: string }) {
  const isWildberries = title === 'Wildberries'
  const isOzon = title === 'Ozon'
  const isYandexMarket = title === 'Яндекс Маркет'
  const displayTitle = isOzon ? 'OZON' : title

  return (
    <div className="rounded-2xl border border-[#252064]/15 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#252064]/40 hover:shadow-md">
      <div className="flex items-center gap-3">
        {isWildberries ? (
          <div
            className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#252064]/10 shadow-sm ring-1 ring-[#252064]/10"
            aria-hidden="true"
          >
            <Store className="size-6 text-[#252064]" />
          </div>
        ) : isOzon ? (
          <div
            className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#252064]/10 shadow-sm ring-1 ring-[#252064]/10"
            aria-hidden="true"
          >
            <Box className="size-6 text-[#252064]" />
          </div>
        ) : isYandexMarket ? (
          <div
            className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#252064]/10 shadow-sm ring-1 ring-[#252064]/10"
            aria-hidden="true"
          >
            <Truck className="size-6 text-[#252064]" />
          </div>
        ) : (
          <div className="h-1.5 w-12 shrink-0 rounded-full bg-[#252064]" aria-hidden="true" />
        )}
        <p className="text-base font-black text-[#252064]">{displayTitle}</p>
      </div>
    </div>
  )
}
