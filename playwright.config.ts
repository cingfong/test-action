import { defineConfig, devices } from '@playwright/test'
import { config as loadEnv } from 'dotenv'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

// 優先讀 e2e/.env（本機開發），不存在時回退至 process.env（CI 由 workflow 注入）。
const envPath = resolve(process.cwd(), 'e2e/.env')
if (existsSync(envPath)) {
  loadEnv({ path: envPath })
}

const PORT = 3100
const BASE_URL = `http://127.0.0.1:${PORT}`
const isCI = !!process.env.CI

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // 本機用 dev（改動即時反映）；CI 改用已 build 的產物 preview——啟動快、不邊測邊編譯，
  // 避免 dev 冷編譯逾時（config.webServer timeout）。CI 需先在 workflow 執行 `pnpm build`。
  // 綁定 127.0.0.1 對齊 BASE_URL，避開 localhost 解析到 IPv6 導致 readiness 檢查等不到的問題。
  webServer: {
    command: isCI ? 'pnpm preview' : `pnpm dev --port ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !isCI,
    timeout: 180_000,
    env: {
      PORT: String(PORT),
      NITRO_PORT: String(PORT),
      HOST: '127.0.0.1',
      NITRO_HOST: '127.0.0.1',
    },
  },
})
