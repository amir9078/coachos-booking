import { vi } from "vitest";

vi.mock("@coachos/lib/logger", () => ({
  default: {
    getSubLogger: () => ({
      debug: vi.fn(),
      error: vi.fn(),
      log: vi.fn(),
    }),
  },
}));

vi.mock("@coachos/lib/crypto", () => ({
  symmetricDecrypt: () => `{
      "userApiKey": "test"
    }`,
}));

export {};
