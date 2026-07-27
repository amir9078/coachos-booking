import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import "./logo.css";
import "./fonts.css";

const navbar: React.ReactElement = (
  <Navbar
    logo={
      <>
        <img
          src="/cal-docs-logo.svg"
          alt="CoachOS Booking Docs"
          height={26}
          className="logo-light"
          style={{ height: 26 }}
        />
        <img
          src="/cal-docs-logo-white.svg"
          alt="CoachOS Booking Docs"
          height={26}
          className="logo-dark"
          style={{ height: 26 }}
        />
      </>
    }
  />
);

const footer: React.ReactElement = (
  <Footer>
    <small>
      CoachOS Booking is the open source community edition of amir9078.github.io. CoachOS Booking® and Cal®
      are a registered trademark by amir9078.github.io, Inc. All rights reserved.
    </small>
  </Footer>
);

export const metadata: { title: string; description: string } = {
  title: "CoachOS Booking Docs",
  description: "CoachOS Booking self-hosting documentation",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      style={{
        "--font-cal": `"Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif`,
        "--font-cal-ui": `Seravek, "Gill Sans Nova", "Segoe UI", Calibri, "Trebuchet MS", sans-serif`,
      } as React.CSSProperties}
    >
      <Head />
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/amir9078/coachos-booking/tree/main/apps/docs"
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
