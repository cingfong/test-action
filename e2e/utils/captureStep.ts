import type { Page } from '@playwright/test'
import { mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import process from 'node:process'

// 逐步截圖統一輸出根目錄（相對於專案根）。
const ARTIFACTS_DIR = resolve(process.cwd(), 'e2e/artifacts')

// 每個 caseName 各自維護一個遞增步驟序號，讓檔名自然以 01、02、03… 排序。
const stepCounters = new Map<string, number>()

/**
 * 逐步截圖活文件。輸出到 `e2e/artifacts/<caseName>/NN-<stepName>.jpg`。
 *
 * - 用 JPEG（quality 70）而非 PNG，體積約小 5～10 倍，適合大量步驟截圖。
 * - 預設截 viewport（不帶 fullPage），再進一步縮小體積；需要整頁時自行傳 fullPage。
 * - 檔名前綴序號依 caseName 各自從 01 遞增，同一條線的步驟即照順序排列。
 *
 * @param page      Playwright Page
 * @param caseName  這條線／案例名稱（如 'hse-to-ag'），對應輸出子資料夾
 * @param stepName  這一步的名稱（如 'basic-填寫完成'）
 * @param options   fullPage：是否整頁截圖（預設 false，只截 viewport）
 */
export async function captureStep(
  page: Page,
  caseName: string,
  stepName: string,
  options: { fullPage?: boolean } = {},
): Promise<void> {
  // 只過濾檔名不合法字元（路徑分隔、OS 保留字元、空白），保留中文等一般字元。
  const sanitize = (s: string) => s.replace(/[\\/:*?"<>|\s]+/g, '_')
  const safeCase = sanitize(caseName)
  const safeStep = sanitize(stepName)

  const next = (stepCounters.get(caseName) ?? 0) + 1
  stepCounters.set(caseName, next)
  const seq = String(next).padStart(2, '0')

  const dir = resolve(ARTIFACTS_DIR, safeCase)
  await mkdir(dir, { recursive: true })

  await page.screenshot({
    path: resolve(dir, `${seq}-${safeStep}.jpg`),
    type: 'jpeg',
    quality: 70,
    fullPage: options.fullPage ?? false,
  })
}
