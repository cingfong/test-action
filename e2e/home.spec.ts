import { expect, test } from '@playwright/test'

test('首頁可以正常載入', async ({ page }) => {
  await page.goto('/')
  // Nuxt 預設模板 app.vue 內容會是 NuxtWelcome；這裡只驗證 HTML 有正常回應。
  await expect(page).toHaveURL(/\/$/)
  await expect(page.locator('html')).toBeVisible()
})
