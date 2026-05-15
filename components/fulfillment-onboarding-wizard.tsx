'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import {
  persistOnboardingFinished,
  readOnboardingStep,
  shouldRunFulfillmentOnboarding,
  writeOnboardingStep,
  type OnboardingStep,
} from '@/lib/fulfillment-onboarding'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const TOTAL = 3

type FulfillmentOnboardingWizardProps = {
  /** Только UI: открыть сразу, не трогать localStorage и флаги регистрации */
  demo?: boolean
}

export function FulfillmentOnboardingWizard({ demo = false }: FulfillmentOnboardingWizardProps) {
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<OnboardingStep>(1)
  const finishingRef = useRef(false)

  useEffect(() => {
    setMounted(true)
    if (demo) {
      setStep(1)
      setOpen(true)
      return
    }
    if (!shouldRunFulfillmentOnboarding()) return
    setStep(readOnboardingStep())
    setOpen(true)
  }, [demo])

  const finish = useCallback(() => {
    finishingRef.current = true
    if (!demo) persistOnboardingFinished()
    setOpen(false)
    queueMicrotask(() => {
      finishingRef.current = false
    })
  }, [demo])

  const goNext = useCallback(() => {
    setStep((s) => {
      const next = Math.min(TOTAL, s + 1) as OnboardingStep
      if (!demo) writeOnboardingStep(next)
      return next
    })
  }, [demo])

  const goBack = useCallback(() => {
    setStep((s) => {
      const prev = Math.max(1, s - 1) as OnboardingStep
      if (!demo) writeOnboardingStep(prev)
      return prev
    })
  }, [demo])

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (next) return
      if (finishingRef.current) return
      if (demo) {
        finishingRef.current = true
        setOpen(false)
        queueMicrotask(() => {
          finishingRef.current = false
        })
        return
      }
      finish()
    },
    [demo, finish],
  )

  if (!mounted || !open) return null

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton
        className="max-h-[min(90vh,640px)] gap-0 overflow-hidden rounded-3xl border-[#252064]/15 bg-white p-0 text-[#252064] shadow-[0_24px_80px_rgba(37,32,100,0.2)] sm:max-w-lg"
      >
        <div className="border-b border-[#252064]/10 bg-[#252064]/[0.04] px-5 py-4 sm:px-6">
          <p className="text-center text-xs font-bold text-[#252064]/55">
            Шаг {step} из {TOTAL}
          </p>
          <div className="mx-auto mt-2 h-1.5 max-w-[220px] overflow-hidden rounded-full bg-[#252064]/10">
            <div
              className="h-full rounded-full bg-[#E4003C] transition-[width] duration-300 ease-out"
              style={{ width: `${(step / TOTAL) * 100}%` }}
            />
          </div>
        </div>

        <div className="max-h-[min(60vh,420px)] overflow-y-auto px-5 py-5 sm:px-6">
          {step === 1 ? <StepOne /> : null}
          {step === 2 ? <StepTwo /> : null}
          {step === 3 ? <StepThree /> : null}
        </div>

        <DialogFooter className="flex-col gap-3 border-t border-[#252064]/10 bg-[#252064]/[0.02] px-5 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-2 sm:px-6">
          <button
            type="button"
            className="order-last w-full text-sm font-semibold text-[#252064]/55 underline-offset-4 transition hover:text-[#E4003C] hover:underline sm:order-first sm:mr-auto sm:w-auto"
            onClick={finish}
          >
            Пропустить
          </button>
          <div className="flex w-full flex-col gap-2 sm:ml-auto sm:w-auto sm:flex-row sm:justify-end">
            {step > 1 ? (
              <button
                type="button"
                className="inline-flex h-11 min-w-[7rem] items-center justify-center rounded-xl border border-[#252064]/20 px-4 text-sm font-bold text-[#252064] transition hover:bg-[#252064]/5"
                onClick={goBack}
              >
                Назад
              </button>
            ) : null}
            {step < TOTAL ? (
              <button
                type="button"
                className="inline-flex h-11 min-w-[7rem] items-center justify-center rounded-xl bg-[#E4003C] px-4 text-sm font-bold text-white shadow-[0_12px_24px_rgba(228,0,60,0.22)] transition hover:bg-[#252064]"
                onClick={goNext}
              >
                Далее
              </button>
            ) : (
              <button
                type="button"
                className="inline-flex h-11 min-w-[7rem] items-center justify-center rounded-xl bg-[#E4003C] px-4 text-sm font-bold text-white shadow-[0_12px_24px_rgba(228,0,60,0.22)] transition hover:bg-[#252064]"
                onClick={finish}
              >
                Завершить
              </button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function StepOne() {
  return (
    <>
      <DialogHeader className="gap-2 text-left">
        <DialogTitle className="text-xl font-black tracking-tight text-[#252064] sm:text-2xl">
          Оформим новую поставку
        </DialogTitle>
        <DialogDescription asChild>
          <p className="text-sm leading-relaxed text-[#252064]/75">
            Коротко покажем путь: от новой заявки до оплаты — без лишнего текста.
          </p>
        </DialogDescription>
      </DialogHeader>
      <ul className="mt-4 space-y-2.5 text-sm leading-snug text-[#252064]/85">
        <li className="flex gap-2">
          <span className="mt-0.5 font-black text-[#E4003C]">1.</span>
          <span>
            Раздел <strong className="text-[#252064]">«Новая поставка»</strong> → кнопка{' '}
            <strong className="text-[#252064]">«Новая поставка»</strong>.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="mt-0.5 font-black text-[#E4003C]">2.</span>
          <span>
            Выбери магазин и дату поставки. <strong className="text-[#252064]">Срок сдачи груза на склад</strong> — в{' '}
            <strong className="text-[#252064]">правом верхнем углу</strong>.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="mt-0.5 font-black text-[#E4003C]">3.</span>
          <span>Укажи число грузовых мест и услуги; при необходимости — комментарий.</span>
        </li>
        <li className="flex gap-2">
          <span className="mt-0.5 font-black text-[#E4003C]">4.</span>
          <span>Контакт для РЦ и контакт для водителя при доставке.</span>
        </li>
        <li className="flex gap-2">
          <span className="mt-0.5 font-black text-[#E4003C]">5.</span>
          <span>
            Проверь «откуда — куда», дату и места → <strong className="text-[#252064]">«Готово»</strong>, затем оплата.
          </span>
        </li>
      </ul>
    </>
  )
}

function StepTwo() {
  return (
    <>
      <DialogHeader className="gap-2 text-left">
        <DialogTitle className="text-xl font-black tracking-tight text-[#252064] sm:text-2xl">Оплата груза</DialogTitle>
        <DialogDescription asChild>
          <p className="text-sm leading-relaxed text-[#252064]/75">
            После оформления остаётся оплатить груз — заявка уйдёт в обработку.
          </p>
        </DialogDescription>
      </DialogHeader>
      <ul className="mt-4 space-y-2.5 text-sm leading-snug text-[#252064]/85">
        <li className="flex gap-2">
          <span className="mt-0.5 font-black text-[#E4003C]">·</span>
          <span>Оплата завершается в том же потоке, пока заявка «свежая».</span>
        </li>
        <li className="flex gap-2">
          <span className="mt-0.5 font-black text-[#E4003C]">·</span>
          <span>
            После оплаты поставка появится в разделе <strong className="text-[#252064]">«Поставки»</strong>.
          </span>
        </li>
      </ul>
    </>
  )
}

function StepThree() {
  return (
    <>
      <DialogHeader className="gap-2 text-left">
        <DialogTitle className="text-xl font-black tracking-tight text-[#252064] sm:text-2xl">
          Все поставки под рукой
        </DialogTitle>
        <DialogDescription asChild>
          <p className="text-sm leading-relaxed text-[#252064]/75">
            В разделе «Поставки» — статус, история и возврат к нужной заявке.
          </p>
        </DialogDescription>
      </DialogHeader>
      <ul className="mt-4 space-y-2.5 text-sm leading-snug text-[#252064]/85">
        <li className="flex gap-2">
          <span className="mt-0.5 font-black text-[#E4003C]">·</span>
          <span>Смотри статус и цепочку событий по каждой поставке.</span>
        </li>
        <li className="flex gap-2">
          <span className="mt-0.5 font-black text-[#E4003C]">·</span>
          <span>Оттуда же удобно снова открыть заявку или перейти к оплате, если нужно.</span>
        </li>
      </ul>
    </>
  )
}
