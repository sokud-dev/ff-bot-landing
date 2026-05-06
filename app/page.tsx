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
import wildberriesLogo from '../png-wildberries-logotip-png-1.png'
import yandexMarketLogo from '../ямаркет.jpeg'

const LEGAL_LINKS = {
  joinAgreement: '/docs/join-agreement.pdf',
  fulfillmentServicesAgreement: '/docs/fulfillment-services-agreement.pdf',
  personalDataConsent: '/docs/personal-data-consent.pdf',
  personalDataPolicy: '/docs/personal-data-policy.pdf',
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
                      {index < ROUTE_STEPS.length - 1 ? (
                        <ArrowRight className="ml-auto size-4 text-[#E4003C]" aria-hidden="true" />
                      ) : null}
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
              title="Быстрый расчет стоимости фулфилмента для вашего бизнеса. Без менеджера и ожидания"
            />
            <FeatureCard
              icon={<RefreshCcw className="size-5" aria-hidden="true" />}
              title="Полный цикл в одном окне: от оформления заявки до отслеживания груза"
            />
            <FeatureCard
              icon={<Wallet className="size-5" aria-hidden="true" />}
              title="Автопополнение баланса с онлайн-кассой — настрой лимит, плати доставку автоматически, без простоев в логистике"
            />
          </div>
        </section>

        <section id="login" className="flex flex-col items-center gap-6">
          <div className="w-full max-w-md overflow-hidden rounded-3xl border border-[#252064]/15 bg-white shadow-[0_18px_50px_rgba(37,32,100,0.12)]">
            <div className="h-2 w-full bg-[linear-gradient(90deg,#E4003C_0%,#E4003C_34%,#252064_34%,#252064_100%)]" />
            <div className="p-6">
              <div className="mb-5 flex flex-col gap-2">
                <h2 className="text-xl font-black text-[#252064]">Вход в личный кабинет</h2>
                <p className="text-sm text-[#252064]/70">Авторизация происходит на защищённой странице сервиса.</p>
              </div>

              <form
                action="https://fulfillment-web-production.up.railway.app/login"
                method="post"
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="username" className="text-sm font-medium">
                    Username / Email
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    autoComplete="username"
                    className="h-11 w-full rounded-xl border border-[#252064]/20 bg-white px-3 text-sm shadow-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E4003C]/35"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="h-11 w-full rounded-xl border border-[#252064]/20 bg-white px-3 text-sm shadow-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E4003C]/35"
                  />
                </div>

                <fieldset className="mt-1 flex flex-col gap-3">
                  <legend className="sr-only">Юридические согласия</legend>

                  <label className="flex items-start gap-3 text-sm leading-relaxed text-[#252064]">
                    <input
                      name="accept_join_terms"
                      type="checkbox"
                      required
                      className="mt-1 size-4 rounded border border-[#252064]/20 text-[#E4003C] accent-[#E4003C]"
                    />
                    <span>
                      Я принимаю условия и тарифы присоединения к фулфилменту{' '}
                      <span className="text-[#252064]/60">
                        (
                        <a
                          href={LEGAL_LINKS.joinAgreement}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#252064] underline underline-offset-4 transition hover:text-[#E4003C]"
                        >
                          Соглашение о присоединении
                        </a>
                        {' · '}
                        <a
                          href={LEGAL_LINKS.fulfillmentServicesAgreement}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#252064] underline underline-offset-4 transition hover:text-[#E4003C]"
                        >
                          Договор оказания услуг фулфилмента
                        </a>
                        )
                      </span>
                    </span>
                  </label>

                  <label className="flex items-start gap-3 text-sm leading-relaxed text-[#252064]">
                    <input
                      name="accept_personal_data"
                      type="checkbox"
                      required
                      className="mt-1 size-4 rounded border border-[#252064]/20 text-[#E4003C] accent-[#E4003C]"
                    />
                    <span>
                      Я принимаю соглашение на обработку персональных данных согласно политике конфиденциальности{' '}
                      <span className="text-[#252064]/60">
                        (
                        <a
                          href={LEGAL_LINKS.personalDataConsent}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#252064] underline underline-offset-4 transition hover:text-[#E4003C]"
                        >
                          Согласие на обработку персональных данных
                        </a>
                        {' · '}
                        <a
                          href={LEGAL_LINKS.personalDataPolicy}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#252064] underline underline-offset-4 transition hover:text-[#E4003C]"
                        >
                          Политика в отношении обработки персональных данных
                        </a>
                        )
                      </span>
                    </span>
                  </label>
                </fieldset>

                <button
                  type="submit"
                  className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-full bg-[#E4003C] px-4 text-sm font-bold text-white shadow-[0_10px_20px_rgba(228,0,60,0.24)] transition hover:bg-[#252064] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E4003C]/35 active:opacity-90"
                >
                  Login
                </button>
              </form>
            </div>
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

function FeatureCard({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-[#252064]/15 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="absolute right-0 top-0 h-full w-2 bg-[#E4003C]" aria-hidden="true" />
      <div className="mb-4 inline-flex size-11 items-center justify-center rounded-2xl bg-[#E4003C]/10 text-[#E4003C] transition group-hover:bg-[#E4003C] group-hover:text-white">
        {icon}
      </div>
      <p className="pr-3 text-pretty text-lg font-semibold leading-relaxed text-[#252064]/80">{title}</p>
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
