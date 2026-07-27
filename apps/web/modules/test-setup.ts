import matchers from "@testing-library/jest-dom/matchers";
import React from "react";
import ResizeObserver from "resize-observer-polyfill";
import { afterEach, expect, vi } from "vitest";

global.React = React;
global.ResizeObserver = ResizeObserver;
expect.extend(matchers);

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

afterEach(() => {
  vi.resetAllMocks();
});

// Mock all modules that are used in multiple tests for modules
// We don't intend to provide the mock implementation here. They should be provided by respective tests.
// But it makes it super easy to start testing any module view without worrying about mocking the dependencies.
vi.mock("next-auth/react", () => ({
  useSession: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: vi.fn().mockReturnValue({
    replace: vi.fn(),
  }),
  usePathname: vi.fn().mockReturnValue("/settings/billing"),
}));

vi.mock("@coachos/app-store/BookingPageTagManager", () => ({
  default: vi.fn(),
}));

vi.mock("@coachos/app-store/locations", () => ({
  DailyLocationType: "daily",
  guessEventLocationType: vi.fn(),
  getSuccessPageLocationMessage: vi.fn(),
}));

vi.mock("@coachos/app-store/utils", () => ({
  getEventTypeAppData: vi.fn(),
}));

vi.mock("@coachos/features/eventtypes/lib/eventNaming", () => ({
  getEventName: vi.fn(),
}));

vi.mock("@coachos/web/modules/event-types/components", () => ({
  EventTypeDescriptionLazy: vi.fn(),
}));

vi.mock("@coachos/embed-core/embed-iframe", () => {
  return {
    useIsBackgroundTransparent: vi.fn(),
    useIsEmbed: vi.fn(),
    useEmbedNonStylesConfig: vi.fn(),
    useEmbedStyles: vi.fn(),
  };
});

vi.mock("@coachos/web/modules/bookings/components/event-meta/Price", () => {
  return {};
});

vi.mock("@coachos/lib/bookings/SystemField", () => {
  return {};
});

vi.mock("@coachos/lib/constants", () => {
  return {
    DEFAULT_LIGHT_BRAND_COLOR: "DEFAULT_LIGHT_BRAND_COLOR",
    DEFAULT_DARK_BRAND_COLOR: "DEFAULT_DARK_BRAND_COLOR",
    BOOKER_NUMBER_OF_DAYS_TO_LOAD: 1,
  };
});

vi.mock("@coachos/lib/dayjs", () => {
  return {};
});

vi.mock("@coachos/lib/getBrandColours", () => {
  return {
    default: vi.fn(),
  };
});

vi.mock("@coachos/lib/hooks/useCompatSearchParams", () => {
  return {
    useCompatSearchParams: vi.fn(),
  };
});

vi.mock("@coachos/lib/hooks/useLocale", () => {
  return {
    useLocale: () => ({
      t: (text: string) => text,
      i18n: {
        language: "en",
      },
    }),
  };
});

vi.mock("@coachos/lib/hooks/useRouterQuery", () => {
  return {
    useRouterQuery: vi.fn(),
  };
});

vi.mock("@coachos/lib/hooks/useTheme", () => {
  return {
    default: vi.fn(),
  };
});

vi.mock("@coachos/lib/recurringStrings", () => {
  return {};
});

vi.mock("@coachos/lib/recurringStrings", () => {
  return {};
});

vi.mock("@coachos/prisma/zod-utils", () => ({
  BookerLayouts: {
    MONTH_VIEW: "month",
  },
  EventTypeMetaDataSchema: {
    parse: vi.fn(),
  },
  bookingMetadataSchema: {
    parse: vi.fn(),
  },
}));

vi.mock("@coachos/app-store/zod-utils", () => ({
  eventTypeMetaDataSchemaWithTypedApps: {
    parse: vi.fn(),
  },
}));

vi.mock("@coachos/trpc/react", () => ({
  trpc: {
    viewer: {
      public: {
        submitRating: {
          useMutation: vi.fn(),
        },
        markHostAsNoShow: {
          useMutation: vi.fn(),
        },
      },
    },
  },
}));

vi.mock("@coachos/ui/styles", () => ({
  useCalcomTheme: vi.fn(),
}));

vi.mock("@coachos/ui/components/icon", () => ({
  Icon: vi.fn(),
}));

vi.mock("@coachos/ui/components/unpublished-entity", () => ({
  UnpublishedEntity: vi.fn(),
}));

vi.mock("@coachos/ui/components/avatar", () => ({
  UserAvatar: vi.fn(),
  Avatar: () => null,
}));

vi.mock("@coachos/web/components/PageWrapper", () => ({
  default: vi.fn(),
}));

vi.mock("@coachos/web/components/booking/CancelBooking", () => ({}));

vi.mock("@coachos/web/components/schemas/EventReservationSchema", () => ({
  default: vi.fn(),
}));

vi.mock("@coachos/web/lib/clock", () => ({
  timeZone: vi.fn(),
}));

vi.mock("./bookings-single-view.getServerSideProps", () => ({}));

vi.mock("@coachos/lib/webstorage", () => ({
  localStorage: {
    getItem: vi.fn(),
    setItem: vi.fn(),
  },
}));

vi.mock("@coachos/lib/timeFormat", () => ({
  detectBrowserTimeFormat: vi.fn(),
  isBrowserLocale24h: vi.fn(),
  getIs24hClockFromLocalStorage: vi.fn(),
}));
