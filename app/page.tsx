import { Calculator, FileText, Phone, RefreshCcw, Wallet } from 'lucide-react'

const LEGAL_LINKS = {
  joinAgreement: '/docs/join-agreement.pdf',
  fulfillmentServicesAgreement: '/docs/fulfillment-services-agreement.pdf',
  personalDataConsent: '/docs/personal-data-consent.pdf',
  personalDataPolicy: '/docs/personal-data-policy.pdf',
} as const

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="flex w-full flex-col gap-12 px-4 py-10 sm:px-6 sm:py-14">
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium tracking-wide text-muted-foreground">Фулфилмент · B2B логистика</p>
            <h1 className="text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
              Почему именно наш сервис?
            </h1>
          </div>

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

        <section className="flex flex-col items-center gap-6">
          <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-sm">
            <div className="mb-5 flex flex-col gap-2">
              <h2 className="text-xl font-semibold">Вход в личный кабинет</h2>
              <p className="text-sm text-muted-foreground">Авторизация происходит на защищённой странице сервиса.</p>
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
                  className="h-11 w-full rounded-lg border bg-background px-3 text-sm shadow-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
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
                  className="h-11 w-full rounded-lg border bg-background px-3 text-sm shadow-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
                />
              </div>

              <fieldset className="mt-1 flex flex-col gap-3">
                <legend className="sr-only">Юридические согласия</legend>

                <label className="flex items-start gap-3 text-sm leading-relaxed text-foreground">
                  <input
                    name="accept_join_terms"
                    type="checkbox"
                    required
                    className="mt-1 size-4 rounded border border-input text-primary accent-[color:var(--primary)]"
                  />
                  <span>
                    Я принимаю условия и тарифы присоединения к фулфилменту{' '}
                    <span className="text-muted-foreground">
                      (
                      <a
                        href={LEGAL_LINKS.joinAgreement}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline underline-offset-4 transition hover:opacity-80"
                      >
                        Соглашение о присоединении
                      </a>
                      {' · '}
                      <a
                        href={LEGAL_LINKS.fulfillmentServicesAgreement}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline underline-offset-4 transition hover:opacity-80"
                      >
                        Договор оказания услуг фулфилмента
                      </a>
                      )
                    </span>
                  </span>
                </label>

                <label className="flex items-start gap-3 text-sm leading-relaxed text-foreground">
                  <input
                    name="accept_personal_data"
                    type="checkbox"
                    required
                    className="mt-1 size-4 rounded border border-input text-primary accent-[color:var(--primary)]"
                  />
                  <span>
                    Я принимаю соглашение на обработку персональных данных согласно политике конфиденциальности{' '}
                    <span className="text-muted-foreground">
                      (
                      <a
                        href={LEGAL_LINKS.personalDataConsent}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline underline-offset-4 transition hover:opacity-80"
                      >
                        Согласие на обработку персональных данных
                      </a>
                      {' · '}
                      <a
                        href={LEGAL_LINKS.personalDataPolicy}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline underline-offset-4 transition hover:opacity-80"
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
                className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 active:opacity-90"
              >
                Login
              </button>
            </form>
          </div>
        </section>

        <footer className="rounded-xl border bg-card shadow-sm">
          <div className="h-2 w-full rounded-t-xl bg-primary" />
          <div className="flex flex-col gap-3 px-5 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-foreground/80">© {new Date().getFullYear()} Fulfillment. Все права защищены.</p>
              <p className="flex flex-wrap items-center gap-2">
                Контакты:{' '}
                <a
                  href="tel:+74956400102"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  +7 (495) 640-01-02
                </a>
              </p>
            </div>
            <nav className="flex flex-col gap-2">
              <p className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-3 py-1.5 font-semibold text-primary-foreground shadow-sm">
                <FileText className="size-4" aria-hidden="true" />
                Документы
              </p>
              <div className="flex flex-wrap gap-x-3 gap-y-2">
                <a
                  href={LEGAL_LINKS.joinAgreement}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4 transition hover:opacity-80"
                >
                  Соглашение о присоединении
                </a>
                <a
                  href={LEGAL_LINKS.fulfillmentServicesAgreement}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4 transition hover:opacity-80"
                >
                  Договор фулфилмента
                </a>
                <a
                  href={LEGAL_LINKS.personalDataPolicy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4 transition hover:opacity-80"
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
    <div className="group flex flex-col gap-3 rounded-xl border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary/15">
        {icon}
      </div>
      <p className="text-pretty text-sm leading-relaxed text-foreground/90">{title}</p>
    </div>
  )
}
