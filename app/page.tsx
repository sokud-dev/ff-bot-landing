import {
  ArrowRight,
  Calculator,
  FileText,
  PackageCheck,
  Phone,
  RefreshCcw,
  ShieldCheck,
  Truck,
  Wallet,
} from 'lucide-react'
import Image from 'next/image'

import ozonLogo from '../ozon.jpg'
import { LoginCard } from '../components/login-card'
import wildberriesLogo from '../png-wildberries-logotip-png-1.png'
import yandexMarketLogo from '../ямаркет.jpeg'

const LEGAL_LINKS = {
  joinAgreement: '/documents/ПЭК_Соглашение о присоединении к договору оказания услуг Фулфилмента.docx',
  fulfillmentServicesAgreement: '/documents/Договор присоединения_фулфилмент.docx',
  personalDataConsent: '/documents/Согласие на обработку персональных данных Пользователя веб-сервисов.docx',
  personalDataPolicy: '/documents/Политика_обработки_персональных_данных_v8.docx',
} as const

const MARKETPLACES = ['Wildberries', 'Ozon', 'Яндекс Маркет'] as const

const ROUTE_STEPS = ['Приемка', 'Хранение', 'Комплектация', 'Отгрузка'] as const

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#252064]/5 text-[#252064]">
      <div className="flex w-full flex-col gap-12 px-4 py-6 sm:px-6 sm:py-10">
        <section className="relative overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_80px_rgba(37,32,100,0.16)]">
          <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[#252064] lg:block" aria-hidden="true" />
          <div
            className="absolute -right-24 top-0 hidden h-full w-[58%] skew-x-[-12deg] bg-[#E4003C] lg:block"
            aria-hidden="true"
          />
          <div
            className="absolute right-8 top-8 hidden h-24 w-24 rounded-full border-[18px] border-white/20 lg:block"
            aria-hidden="true"
          />

          <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-12">
            <div className="flex flex-col justify-center gap-7">
              <div className="inline-flex w-fit items-center gap-3 rounded-full bg-[#252064]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#252064]">
                <span className="size-2 rounded-full bg-[#E4003C]" aria-hidden="true" />
                Фулфилмент · B2B логистика
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="max-w-3xl text-balance text-4xl font-black leading-[0.98] tracking-tight text-[#252064] sm:text-6xl lg:text-7xl">
                  Доставка до маркетплейсов
                </h1>
                <p className="max-w-2xl text-pretty text-lg leading-relaxed text-[#252064]/70 sm:text-xl">
                  Доставим ваши товары на склады в срок: от приемки и упаковки до отгрузки в Wildberries, Ozon и
                  Яндекс Маркет.
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
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#252064]/20 bg-white px-6 text-sm font-bold text-[#252064] transition hover:border-[#E4003C]/40 hover:bg-[#252064]/5"
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
                  <div className="rounded-2xl bg-white p-3 text-[#E4003C] shadow-lg">
                    <Truck className="size-8" aria-hidden="true" />
                  </div>
                </div>

                <div className="my-8 grid gap-3">
                  {ROUTE_STEPS.map((step, index) => (
                    <div
                      key={step}
                      className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-[#252064] shadow-sm"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#E4003C] text-sm font-black text-white">
                        {index + 1}
                      </span>
                      <span className="font-bold">{step}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white p-4 text-[#252064]">
                    <PackageCheck className="mb-3 size-6 text-[#E4003C]" aria-hidden="true" />
                    <p className="text-sm font-bold leading-snug">Маркировка и упаковка</p>
                  </div>
                  <div className="rounded-2xl bg-[#E4003C] p-4 text-white">
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
              icon={<Calculator className="size-5" aria-hidden="true" />}
              illustration="calculator"
              title="Быстрый расчет стоимости фулфилмента для вашего бизнеса. Без менеджера и ожидания"
            />
            <FeatureCard
              icon={<RefreshCcw className="size-5" aria-hidden="true" />}
              illustration="cycle"
              title="Полный цикл в одном окне: от оформления заявки до отслеживания груза"
            />
            <FeatureCard
              icon={<Wallet className="size-5" aria-hidden="true" />}
              illustration="payment"
              title="Автопополнение баланса с онлайн-кассой — настрой лимит, плати доставку автоматически, без простоев в логистике"
            />
          </div>
        </section>

        <section
          id="login"
          className="relative isolate flex flex-col items-center gap-6 overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_18%_18%,rgba(228,0,60,0.18),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(255,255,255,0.28),transparent_26%),linear-gradient(135deg,#252064_0%,#332a83_54%,#E4003C_100%)] p-6 text-white shadow-[0_24px_80px_rgba(37,32,100,0.2)] sm:p-8"
        >
          <h2 className="relative text-center text-3xl font-black tracking-tight text-white sm:text-5xl">
            Оформи заявку прямо сейчас!
          </h2>
          <div className="relative grid w-full max-w-6xl items-center gap-6 lg:grid-cols-[0.65fr_1.35fr]">
            <div className="relative min-h-[220px] overflow-hidden rounded-3xl border border-white/25 bg-white/10 shadow-[0_18px_42px_rgba(0,0,0,0.16)] sm:min-h-[280px] lg:h-full">
              <Image
                src="/fulfillment-workers-pek-uniforms.png"
                alt="Сотрудники склада в форме с логотипом ПЭК принимают, сортируют и упаковывают груз"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <LoginCard legalLinks={LEGAL_LINKS} />
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
  icon,
  illustration,
  title,
}: {
  icon: React.ReactNode
  illustration: 'calculator' | 'cycle' | 'payment'
  title: string
}) {
  return (
    <div className="group relative min-h-[270px] overflow-hidden rounded-3xl border border-[#252064]/15 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_20%_20%,rgba(228,0,60,0.16),transparent_34%),linear-gradient(135deg,rgba(37,32,100,0.08),rgba(228,0,60,0.06))]" aria-hidden="true" />
      <div className="absolute right-0 top-0 h-full w-2 bg-[#E4003C]" aria-hidden="true" />
      <div className="relative mb-5 flex items-start justify-between gap-4">
        <div className="inline-flex size-11 items-center justify-center rounded-2xl bg-[#E4003C]/10 text-[#E4003C] transition group-hover:bg-[#E4003C] group-hover:text-white">
          {icon}
        </div>
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
  const logo = isWildberries ? wildberriesLogo : isOzon ? ozonLogo : isYandexMarket ? yandexMarketLogo : null
  const logoClassName = isYandexMarket
    ? 'size-12 shrink-0 rounded-2xl object-contain p-1.5 shadow-sm'
    : 'size-12 shrink-0 rounded-2xl object-cover shadow-sm'
  const displayTitle = isOzon ? 'OZON' : title

  return (
    <div className="rounded-2xl border border-[#252064]/15 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#E4003C]/40 hover:shadow-md">
      {logo ? (
        <div className="flex items-center gap-3">
          <Image
            src={logo}
            alt={`Логотип ${title}`}
            className={logoClassName}
            priority
          />
          <p className="text-base font-black text-[#252064]">{displayTitle}</p>
        </div>
      ) : (
        <>
          <div className="mb-3 h-1.5 w-12 rounded-full bg-[#E4003C]" />
          <p className="text-base font-black text-[#252064]">{title}</p>
        </>
      )}
    </div>
  )
}
