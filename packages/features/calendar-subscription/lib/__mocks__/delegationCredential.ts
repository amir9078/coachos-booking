import { vi } from "vitest";

export const getCredentialForSelectedCalendar = vi.fn();

vi.mock("@coachos/app-store/delegationCredential", () => ({
  getCredentialForSelectedCalendar,
}));
