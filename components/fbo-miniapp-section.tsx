'use client'

import {
  Clock,
  LayoutDashboard,
  MessageCircleQuestion,
  MousePointerClick,
  Package,
  Phone,
  Route,
  Smartphone,
  Truck,
  UserPlus,
  Warehouse,
} from 'lucide-react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const FBO_STEPS = [
  'Оформите поставку на маркетплейс строго на день из расписания.',
  'Подготовьте поставку.',
  'Заполните заявку на нашем сайте.',
  'Оплатите и наклейте штрих-коды на груз.',
  'Привезите груз самостоятельно или закажите услугу доставки.',
] as const

const FBO_STEP_LABELS = ['Слот', 'Подготовка', 'Заявка', 'Оплата и коды', 'Отгрузка'] as const

const WAREHOUSE_TILES = [
  {
    title: 'Трассы и хабы',
    hint: 'Быстрее выход на ключевые направления',
    Icon: Route,
  },
  {
    title: 'Заезд и окна',
    hint: 'Фуры и легковой транспорт',
    Icon: Truck,
  },
  {
    title: 'Под маркетплейсы',
    hint: 'Хранение и комплектация',
    Icon: Package,
  },
] as const

const SERVICE_STEPS = [
  {
    title: 'Форма ниже',
    hint: '«Сформировать поставку»',
    href: '#login' as const,
    Icon: MousePointerClick,
  },
  {
    title: 'Вход в ЛК',
    hint: 'Email или новый аккаунт',
    href: '/?register=1#login' as const,
    Icon: UserPlus,
  },
  {
    title: 'Сервис открыт',
    hint: 'Заявки и поставки онлайн',
    href: '#login' as const,
    Icon: LayoutDashboard,
  },
] as const

export function FboMiniappSection() {
  return (
    <section
      id="fbo-miniapp"
      className="overflow-hidden rounded-[2rem] border border-[#252064]/8 bg-white shadow-[0_18px_50px_rgba(37,32,100,0.1)]"
    >
      <div className="flex flex-col gap-10 p-6 sm:gap-12 sm:p-8 lg:p-10">
          <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <div className="max-w-2xl space-y-4 text-center sm:text-left">
              <p className="inline-flex items-center justify-center gap-2 self-center rounded-full bg-[#252064]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#252064] sm:self-start">
                <Smartphone className="size-3.5" aria-hidden="true" />
                FBO · наш сервис
              </p>
              <h2 className="text-balance text-3xl font-black tracking-tight text-[#252064] sm:text-4xl lg:text-5xl">
                Работа с FBO и нашим сервисом
              </h2>
              <p className="text-pretty text-sm leading-relaxed text-[#252064]/70 sm:text-base">
                Всё в личном кабинете после входа на этой странице.
              </p>
            </div>

            <div
              className="flex shrink-0 items-center justify-center gap-2 sm:justify-end lg:items-end lg:gap-3"
              aria-label="Два склада. Отгрузка в маркетплейсы каждые 2 дня. Один личный кабинет."
            >
              <span
                className="flex size-12 items-center justify-center rounded-2xl border border-[#252064]/12 bg-[#252064]/[0.06] text-[#252064] sm:size-14"
                title="Два склада"
              >
                <Warehouse className="size-6 sm:size-7" aria-hidden="true" />
              </span>
              <span
                className="flex size-12 items-center justify-center rounded-2xl border border-[#E4003C]/25 bg-[#E4003C]/[0.08] text-[#E4003C] sm:size-14"
                title="Отгрузка в маркетплейсы каждые 2 дня"
              >
                <Clock className="size-6 sm:size-7" aria-hidden="true" />
              </span>
              <span
                className="flex size-12 items-center justify-center rounded-2xl border border-[#252064]/10 bg-white text-[#252064] shadow-sm sm:size-14"
                title="Один личный кабинет"
              >
                <LayoutDashboard className="size-6 sm:size-7" aria-hidden="true" />
              </span>
            </div>
          </header>

          <div className="grid gap-6 lg:gap-8">
            <div className="rounded-3xl border border-[#252064]/12 bg-[#252064]/[0.03] p-6 sm:p-8">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-[#252064] text-white shadow-md">
                    <Smartphone className="size-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-black text-[#252064] sm:text-2xl">Как пользоваться</h3>
                </div>
                <span className="self-start rounded-full bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#252064]/60 ring-1 ring-[#252064]/10 sm:self-auto">
                  3 шага
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
                {SERVICE_STEPS.map(({ title, hint, href, Icon }) => (
                  <a
                    key={title}
                    href={href}
                    className="group flex flex-col gap-3 rounded-2xl border border-[#252064]/10 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#252064]/25 hover:shadow-md sm:p-5"
                  >
                    <div className="flex size-10 items-center justify-center rounded-xl bg-[#252064]/10 text-[#252064] transition group-hover:bg-[#252064] group-hover:text-white">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-black text-[#252064]">{title}</p>
                      <p className="mt-1 text-xs leading-snug text-[#252064]/65 sm:text-sm">{hint}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[#252064]/12 bg-gradient-to-br from-[#252064]/[0.04] to-white p-6 sm:p-8">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#252064] text-white shadow-md">
                    <Warehouse className="size-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#252064] sm:text-2xl">Склады и МП</h3>
                    <p className="mt-1 max-w-xl text-sm text-[#252064]/70">
                      Два склада · отгрузки на маркетплейсы по расписанию каждые 2 дня.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 sm:justify-end">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#252064] px-3 py-1.5 text-xs font-bold text-white sm:text-sm">
                    <Warehouse className="size-3.5" aria-hidden="true" />
                    2 склада
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#252064]/15 bg-white px-3 py-1.5 text-xs font-bold text-[#252064] sm:text-sm">
                    <Clock className="size-3.5 text-[#E4003C]" aria-hidden="true" />
                    каждые 2 дня
                  </span>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
                {WAREHOUSE_TILES.map(({ title, hint, Icon }) => (
                  <div
                    key={title}
                    className="flex gap-3 rounded-2xl border border-white/60 bg-white/90 p-4 shadow-sm ring-1 ring-[#252064]/8"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#E4003C]/10 text-[#E4003C]">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-black text-[#252064]">{title}</p>
                      <p className="mt-1 text-xs leading-snug text-[#252064]/65">{hint}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[#252064]/12 p-6 sm:p-8">
              <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#E4003C]/12 text-[#E4003C]">
                    <MessageCircleQuestion className="size-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-black text-[#252064] sm:text-2xl">FAQ</h3>
                </div>
                <a
                  href="tel:+74956400102"
                  className="inline-flex w-fit items-center gap-2 self-center rounded-full border border-[#252064]/12 bg-[#252064]/[0.04] px-4 py-2 text-sm font-bold text-[#252064] transition hover:border-[#252064]/25 sm:self-auto"
                >
                  <Phone className="size-4 text-[#E4003C]" aria-hidden="true" />
                  +7 (495) 640-01-02
                </a>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="how" className="border-[#252064]/12">
                  <AccordionTrigger className="py-4 text-left text-base font-black text-[#252064] hover:no-underline sm:text-lg">
                    Как это работает?
                  </AccordionTrigger>
                  <AccordionContent className="text-[#252064]/80">
                    <p className="mb-5 max-w-prose text-sm leading-relaxed sm:text-base">
                      Забор, хранение, упаковка и довоз до складов МП — маркетплейс ведёт заказы, вы получаете предсказуемую логистику.
                    </p>
                    <p className="mb-3 text-xs font-black uppercase tracking-wider text-[#252064]/45">Цепочка</p>
                    <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {FBO_STEPS.map((step, index) => (
                        <li
                          key={step}
                          className="flex gap-3 rounded-2xl border border-[#252064]/10 bg-[#252064]/[0.03] p-3 sm:p-3.5"
                        >
                          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#252064] text-xs font-black text-white">
                            {index + 1}
                          </span>
                          <span className="min-w-0">
                            <span className="block text-xs font-bold text-[#252064]">
                              {FBO_STEP_LABELS[index] ?? `Шаг ${index + 1}`}
                            </span>
                            <span className="mt-1 block text-xs leading-snug text-[#252064]/75">{step}</span>
                          </span>
                        </li>
                      ))}
                    </ol>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="request" className="border-[#252064]/12">
                  <AccordionTrigger className="py-4 text-left text-base font-black text-[#252064] hover:no-underline sm:text-lg">
                    Заявка на сайте
                  </AccordionTrigger>
                  <AccordionContent className="text-[#252064]/80">
                    <ul className="grid gap-3 sm:grid-cols-2">
                      <li className="flex gap-3 rounded-2xl border border-[#252064]/10 bg-white p-4">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#E4003C]/15 text-sm font-black text-[#E4003C]">
                          1
                        </span>
                        <span className="text-sm leading-snug">
                          <a href="#login" className="font-bold text-[#E4003C] underline-offset-4 hover:underline">
                            Войти
                          </a>{' '}
                          или{' '}
                          <a
                            href="/?register=1#login"
                            className="font-bold text-[#E4003C] underline-offset-4 hover:underline"
                          >
                            зарегистрироваться
                          </a>{' '}
                          в форме на странице.
                        </span>
                      </li>
                      <li className="flex gap-3 rounded-2xl border border-[#252064]/10 bg-white p-4">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#252064] text-sm font-black text-white">
                          2
                        </span>
                        <span className="text-sm leading-snug">
                          Груз, упаковка, отправитель и получатель. Имя селлера = как в ЛК маркетплейса.
                        </span>
                      </li>
                      <li className="flex gap-3 rounded-2xl border border-[#252064]/10 bg-white p-4 sm:col-span-2">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#252064]/15 text-sm font-black text-[#252064]">
                          3
                        </span>
                        <span className="text-sm leading-snug">На каждое направление — отдельная заявка.</span>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <p className="mt-5 border-t border-[#252064]/10 pt-4 text-center text-xs text-[#252064]/55 sm:text-left sm:text-sm">
                Линия поддержки: пн–пт, 9:00–18:00
              </p>
            </div>
          </div>
        </div>
    </section>
  )
}
