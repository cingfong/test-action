// 代理商身分類型（範例：自包含、不依賴外部 proto/types）。
export enum AgentIdentityType {
  HSE = 1,
  MG = 2,
  MG_EMP = 3,
  MA = 4,
  MA_EMP = 5,
  AG = 6,
  AG_EMP = 7,
}

const AGENT_IDENTITY_LABEL: Record<number, string> = {
  [AgentIdentityType.HSE]: 'A1',
  [AgentIdentityType.MG]: 'B2',
  [AgentIdentityType.MG_EMP]: 'C3',
  [AgentIdentityType.MA]: 'D4',
  [AgentIdentityType.MA_EMP]: 'E5',
  [AgentIdentityType.AG]: 'F6',
  [AgentIdentityType.AG_EMP]: 'G7',
}

/**
 * 取得 Enum 對應的標籤
 */
export function useEnumLabel() {
  const getAgentIdentityLabel = (type?: AgentIdentityType | number) => {
    if (type === undefined || type === null)
      return 'N/A'

    return AGENT_IDENTITY_LABEL[type] || `${type}`
  }

  return {
    getAgentIdentityLabel,
  }
}
