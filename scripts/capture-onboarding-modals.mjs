/**
 * Снимает три шага онбординга (демо-режим) в PNG.
 * Запуск: в одном терминале `npm run dev`, в другом `npm run capture:onboarding`
 * Или: `BASE_URL=https://… npm run capture:onboarding` (сервер уже поднят).
 */

import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { chromium } from 'playwright'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const outDir = join(root, 'docs', 'onboarding-modals')

const base = (process.env.BASE_URL || 'http://localhost:3000').replace(/\/$/, '')

async function waitForServer(url, maxMs = 90000) {
  const start = Date.now()
  while (Date.now() - start < maxMs) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(2000) })
      if (res.ok || res.status === 304) return
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 1000))
  }
  throw new Error(`Сервер не отвечает за ${maxMs / 1000}s: ${url}`)
}

mkdirSync(outDir, { recursive: true })

await waitForServer(`${base}/`)

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: 1280, height: 900 },
  deviceScaleFactor: 2,
})

try {
  await page.goto(`${base}/o-servise?demo=1`, { waitUntil: 'networkidle', timeout: 120000 })
  const dialog = page.getByRole('dialog')
  await dialog.waitFor({ state: 'visible', timeout: 60000 })

  await dialog.screenshot({ path: join(outDir, 'onboarding-step-1.png') })
  await page.getByRole('button', { name: 'Далее' }).click()
  await page.getByRole('heading', { name: 'Оплата груза' }).waitFor({ state: 'visible' })
  await dialog.screenshot({ path: join(outDir, 'onboarding-step-2.png') })
  await page.getByRole('button', { name: 'Далее' }).click()
  await page.getByRole('heading', { name: 'Все поставки под рукой' }).waitFor({ state: 'visible' })
  await dialog.screenshot({ path: join(outDir, 'onboarding-step-3.png') })

  console.log('Готово:', outDir)
} finally {
  await browser.close()
}
