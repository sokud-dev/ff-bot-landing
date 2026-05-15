'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

import { FulfillmentOnboardingWizard } from '@/components/fulfillment-onboarding-wizard'

function OnboardingHostInner() {
  const searchParams = useSearchParams()
  const demo = searchParams.get('demo') === '1'
  return <FulfillmentOnboardingWizard demo={demo} />
}

export function OServiseOnboardingHost() {
  return (
    <Suspense fallback={null}>
      <OnboardingHostInner />
    </Suspense>
  )
}
