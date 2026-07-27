vi.mock("@coachos/lib/next-seo.config", () => ({
  default: {
    headSeo: {
      siteName: "CoachOS Booking",
    },
    defaultNextSeo: {
      title: "CoachOS Booking",
      description: "Scheduling infrastructure for everyone.",
    },
  },
  seoConfig: {
    headSeo: {
      siteName: "CoachOS Booking",
    },
  },
  buildSeoMeta: vi.fn().mockReturnValue({}),
}));
