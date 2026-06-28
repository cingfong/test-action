import { describe, expect, it } from 'vitest'
import { merge } from '~/utils/merge'

describe('merge', () => {
  it('合併不重疊欄位', () => {
    expect(merge({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 })
  })

  it('來源值優先於後續預設值', () => {
    expect(merge({ a: 1 }, { a: 9, b: 2 })).toEqual({ a: 1, b: 2 })
  })

  it('深層巢狀物件遞迴合併', () => {
    expect(merge({ x: { a: 1 } }, { x: { b: 2 } })).toEqual({ x: { a: 1, b: 2 } })
  })

  it('陣列合併並去除重複項（union + 去重，順序不保證）', () => {
    // merge 僅承諾「合集去重」，陣列順序無功能意義（皆用於多選篩選器狀態），故忽略順序比較
    const { list } = merge({ list: [1, 2] }, { list: [2, 3] })
    expect([...list].sort((a, b) => a - b)).toEqual([1, 2, 3])
  })

  it('巢狀陣列同樣去重（union + 去重，順序不保證）', () => {
    const { cfg } = merge(
      { cfg: { ids: ['a', 'b'] } },
      { cfg: { ids: ['b', 'c'] } },
    )
    expect([...cfg.ids].sort()).toEqual(['a', 'b', 'c'])
  })

  // 補：物件陣列「不會」去重（new Set 對 object 為 reference 等價，內容相同但是不同實例 → 視為兩筆）
  // 這個語義很重要：caller 不該假設 merge 會 deep-dedupe 物件陣列
  it('物件陣列不做內容去重（reference 等價，內容相同的兩個物件視為不同）', () => {
    const { list } = merge(
      { list: [{ id: 1 }] },
      { list: [{ id: 1 }] },
    )
    expect(list).toHaveLength(2)
  })

  // 補：一邊陣列、一邊非陣列 → customMerger 不接管，走 defu 預設
  it('source 為陣列、defaults 為非陣列時 source 勝出（defu 預設）', () => {
    expect(merge({ x: [1, 2] }, { x: 'fallback' as any })).toEqual({ x: [1, 2] })
  })

  // 補：空陣列合併（一邊空、一邊有值 → 應併出有值的）
  it('空陣列 + 有值陣列 = 有值陣列（去重後）', () => {
    const { list } = merge({ list: [] }, { list: [1, 2] })
    expect([...list].sort((a, b) => a - b)).toEqual([1, 2])
  })
})
