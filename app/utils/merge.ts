import { createDefu } from 'defu'

/**
 * 合併時陣列去重（source + defaults 合集，移除重複項）
 */
export const merge = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) && Array.isArray(value)) {
    obj[key] = [...new Set([...obj[key], ...value])] as any
    return true
  }
})
