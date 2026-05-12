'use client'

import { MessageCircleQuestion, Smartphone } from 'lucide-react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const FBO_STEPS = [
  'Оформите поставку на маркетплейс строго на день из расписания.',
  'Подготовьте поставку.',
  'Заполните заявку на нашем сайте.',
  'Оплатите и наклейте штрих-коды на груз.',
  'Привезите груз самостоятельно или закажите услугу доставки.',
] as const

export function FboMiniappSection() {
  return (
    <section
      id="fbo-miniapp"
      className="flex flex-col gap-8 rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_rgba(37,32,100,0.1)] sm:p-8"
    >
      <div className="flex flex-col gap-2 text-center sm:text-left">
        <p className="inline-flex items-center justify-center gap-2 self-center rounded-full bg-[#252064]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#252064] sm:self-start">
          <Smartphone className="size-3.5" aria-hidden="true" />
          FBO · наш сервис
        </p>
        <h2 className="text-balance text-3xl font-black tracking-tight text-[#252064] sm:text-4xl lg:text-5xl">
          Работа с FBO и нашим сервисом
        </h2>
        <p className="mx-auto max-w-3xl text-pretty text-base leading-relaxed text-[#252064]/75 sm:mx-0">
          Наш сервис доступен после входа в личный кабинет: сначала пройдите{' '}
          <a href="#login" className="font-semibold text-[#E4003C] underline underline-offset-4 transition hover:text-[#252064]">
            авторизацию
          </a>{' '}
          или{' '}
          <a
            href="/?register=1#login"
            className="font-semibold text-[#E4003C] underline underline-offset-4 transition hover:text-[#252064]"
          >
            регистрацию
          </a>{' '}
          в форме на этой странице — откроется доступ к сервису.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10">
        <div className="flex flex-col justify-center gap-4 rounded-3xl border border-[#252064]/12 bg-[#252064]/[0.03] p-6 sm:p-8">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-[#252064] text-white shadow-md">
            <Smartphone className="size-6" aria-hidden="true" />
          </div>
          <h3 className="text-xl font-black text-[#252064] sm:text-2xl">Как пользоваться нашим сервисом</h3>
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-[#252064]/80 sm:text-base">
            <li>Перейдите к блоку «Оформи заявку прямо сейчас» на этой странице (кнопка «Оформить заявку» ведёт туда же).</li>
            <li>
              Войдите под своим email или{' '}
              <a
                href="/?register=1#login"
                className="font-semibold text-[#E4003C] underline underline-offset-4 hover:text-[#252064]"
              >
                зарегистрируйтесь
              </a>
              , если аккаунта ещё нет.
            </li>
            <li>После успешного входа вы попадёте в личный кабинет с доступом к нашему сервису и оформлению заявок.</li>
          </ol>
        </div>

        <div className="flex flex-col gap-4 rounded-3xl border border-[#252064]/12 p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#E4003C]/12 text-[#E4003C]">
              <MessageCircleQuestion className="size-6" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-black text-[#252064] sm:text-2xl">FBO: частые вопросы</h3>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="how" className="border-[#252064]/12">
              <AccordionTrigger className="py-4 text-left text-base font-black text-[#252064] hover:no-underline sm:text-lg">
                Как это работает?
              </AccordionTrigger>
              <AccordionContent className="text-[#252064]/80">
                <p className="mb-4 leading-relaxed">
                  Мы берём на себя забор, хранение, упаковку и доставку товаров на склады маркетплейсов. Ваши товары
                  получают более высокий рейтинг, а маркетплейс сам обрабатывает заказы.
                </p>
                <p className="mb-2 text-sm font-bold uppercase tracking-wider text-[#252064]/55">Этапы</p>
                <ol className="list-decimal space-y-2 pl-5 leading-relaxed">
                  {FBO_STEPS.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="request" className="border-[#252064]/12">
              <AccordionTrigger className="py-4 text-left text-base font-black text-[#252064] hover:no-underline sm:text-lg">
                Как оформить заявку на сайте?
              </AccordionTrigger>
              <AccordionContent className="text-[#252064]/80">
                <p className="leading-relaxed">
                  <a href="#login" className="font-semibold text-[#E4003C] underline underline-offset-4 hover:text-[#252064]">
                    Авторизуйтесь
                  </a>{' '}
                  или{' '}
                  <a
                    href="/?register=1#login"
                    className="font-semibold text-[#E4003C] underline underline-offset-4 hover:text-[#252064]"
                  >
                    зарегистрируйтесь
                  </a>{' '}
                  в форме на этой странице. Укажите количество груза и необходимую упаковку, данные отправителя и
                  получателя. Имя селлера должно совпадать с личным кабинетом маркетплейса. На каждое направление —
                  отдельная заявка.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <p className="border-t border-[#252064]/10 pt-4 text-sm leading-relaxed text-[#252064]/75">
            По всем возникшим вопросам звоните{' '}
            <a
              href="tel:+74956400102"
              className="font-bold text-[#E4003C] underline-offset-4 hover:underline"
            >
              +7 (495) 640-01-02
            </a>
            , пн–пт с 9:00 до 18:00.
          </p>
        </div>
      </div>
    </section>
  )
}
