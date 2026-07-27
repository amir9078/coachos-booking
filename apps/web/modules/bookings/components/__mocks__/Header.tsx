import { vi } from "vitest";

vi.mock("@coachos/features/bookings/components/Header", () => ({
  Header: ({ children }: { children: React.ReactNode }) => <div data-testid="header">{children}</div>,
}));
