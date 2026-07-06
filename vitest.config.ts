import { defineVitestConfig } from '@nuxt/test-utils/config'

// 走 @nuxt/test-utils：能正確處理 Nuxt 別名（#app、#imports）與自動 import。
export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    include: ['test/**/*.{test,spec}.ts'],
  },
})
