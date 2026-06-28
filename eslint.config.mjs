// @nuxt/eslint 會在 `nuxt prepare` 後產生 .nuxt/eslint.config.mjs，
// 內含適用於本專案的 Vue / TypeScript / Nuxt 規則。這裡僅做封裝與覆寫入口。
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    ignores: [
      '.nuxt/**',
      '.output/**',
      'dist/**',
      'node_modules/**',
      'playwright-report/**',
      'test-results/**',
      'coverage/**',
    ],
  },
  {
    rules: {
      // 專案大量使用 any（protobuf 解析、merge、routeQuery 等），不另行限制。
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
)
