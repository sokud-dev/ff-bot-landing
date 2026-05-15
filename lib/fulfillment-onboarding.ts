/**
 * Одноразовый онбординг Fulfillment после регистрации (лендинг → /o-servise).
 * Флаги в localStorage; при появлении профиля в БД можно дублировать там же ключом onboarding_completed.
 */

export const FF_ONBOARDING_PENDING_KEY = 'ff_fulfillment_onboarding_pending'
export const FF_ONBOARDING_COMPLETED_KEY = 'ff_fulfillment_onboarding_completed'
export const FF_ONBOARDING_STEP_KEY = 'ff_fulfillment_onboarding_step'

export type OnboardingStep = 1 | 2 | 3

export function setOnboardingPendingAfterRegister(): void {
  try {
    if (typeof window === 'undefined') return
    localStorage.removeItem(FF_ONBOARDING_COMPLETED_KEY)
    localStorage.setItem(FF_ONBOARDING_PENDING_KEY, '1')
    localStorage.removeItem(FF_ONBOARDING_STEP_KEY)
  } catch {
    /* ignore */
  }
}

export function persistOnboardingFinished(): void {
  try {
    if (typeof window === 'undefined') return
    localStorage.setItem(FF_ONBOARDING_COMPLETED_KEY, 'true')
    localStorage.removeItem(FF_ONBOARDING_PENDING_KEY)
    localStorage.removeItem(FF_ONBOARDING_STEP_KEY)
  } catch {
    /* ignore */
  }
}

export function readOnboardingStep(): OnboardingStep {
  try {
    const raw = localStorage.getItem(FF_ONBOARDING_STEP_KEY)
    const n = raw ? parseInt(raw, 10) : 1
    if (n === 2 || n === 3) return n
  } catch {
    /* ignore */
  }
  return 1
}

export function writeOnboardingStep(step: OnboardingStep): void {
  try {
    if (typeof window === 'undefined') return
    localStorage.setItem(FF_ONBOARDING_STEP_KEY, String(step))
  } catch {
    /* ignore */
  }
}

export function shouldRunFulfillmentOnboarding(): boolean {
  try {
    if (typeof window === 'undefined') return false
    if (localStorage.getItem(FF_ONBOARDING_COMPLETED_KEY) === 'true') return false
    return localStorage.getItem(FF_ONBOARDING_PENDING_KEY) === '1'
  } catch {
    return false
  }
}
