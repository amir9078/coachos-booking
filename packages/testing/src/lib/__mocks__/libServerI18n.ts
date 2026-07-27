import type * as i18n from "@coachos/i18n/server";
import { beforeEach, vi } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";

vi.mock("@coachos/i18n/server", () => i18nMock);

beforeEach(() => {
  mockReset(i18nMock);
});

const i18nMock = mockDeep<typeof i18n>();
export default i18nMock;
