import { describe, expect, it } from "vitest";
import { AgentIdentityType, useEnumLabel } from "~/composables/useEnumLabel";

describe("useEnumLabel", () => {
  it("回傳對應帳戶類型標籤", () => {
    const { getAgentIdentityLabel } = useEnumLabel();
    expect(getAgentIdentityLabel(AgentIdentityType.HSE)).toBe("A1");
    expect(getAgentIdentityLabel(AgentIdentityType.MG_EMP)).toBe("C3");
    expect(getAgentIdentityLabel(AgentIdentityType.AG_EMP)).toBe("G7");
  });

  it("空值回傳 N/A", () => {
    const { getAgentIdentityLabel } = useEnumLabel();
    expect(getAgentIdentityLabel(undefined)).toBe("N/A");
  });

  it("未知類型回傳該數字字串", () => {
    const { getAgentIdentityLabel } = useEnumLabel();
    expect(getAgentIdentityLabel(999)).toBe("999");
  });
});
