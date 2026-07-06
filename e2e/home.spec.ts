import { expect, test } from '@playwright/test'
import { captureStep } from './utils/captureStep'

test('首頁可以正常載入', async ({ page }) => {
  await page.goto('/')
  // Nuxt 預設模板 app.vue 內容會是 NuxtWelcome；這裡只驗證 HTML 有正常回應。
  await expect(page).toHaveURL(/\/$/)
  await expect(page.locator('html')).toBeVisible()
  await captureStep(page, 'home', '首頁載入')
})

// 逐步截圖示範：驗證 captureStep 會在 e2e/artifacts/demo/ 依序產出 01、02、03…
// 沙盒沒有真正的多步驟表單，這裡以「進站→捲動→重整」模擬三個步驟，重點在驗證 artifacts 產出流程。
test('逐步截圖示範（demo：每步一張）', async ({ page }) => {
  await page.goto('/')
  await captureStep(page, 'demo', 'step-進站')

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await captureStep(page, 'demo', 'step-捲動到底')

  await page.reload()
  await expect(page.locator('html')).toBeVisible()
  await captureStep(page, 'demo', 'step-重新整理')
})
