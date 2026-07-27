import { _generateMetadataForStaticPage } from "app/_utils";
import type { Metadata } from "next";
import type { CSSProperties } from "react";

import { IconSprites } from "@coachos/ui/components/icon";
import type { IconName } from "@coachos/ui/components/icon";

import { lucideIconList } from "../../../../packages/ui/components/icon/icon-list.mjs";
import { IconGrid } from "./IconGrid";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  return await _generateMetadataForStaticPage("Icons Showcase", "", undefined, undefined, "/icons");
}

const FONT_SANS = `Seravek, "Gill Sans Nova", "Segoe UI", Calibri, "Trebuchet MS", sans-serif`;
const FONT_CAL = `"Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif`;

export default function IconsPage() {
  const icons = Array.from(lucideIconList).sort() as IconName[];

  return (
    <div style={{ "--font-sans": FONT_SANS, "--font-cal": FONT_CAL } as CSSProperties}>
      <div className="bg-subtle flex h-screen">
        <IconSprites />
        <div className="bg-default m-auto min-w-full rounded-md p-10 text-right ltr:text-left">
          <h1 className="text-emphasis font-cal text-2xl font-medium">Icons Showcase</h1>
          <IconGrid title="Regular Icons" icons={icons} />
          <IconGrid
            title="Filled Icons"
            icons={icons}
            rootClassName="bg-inverted text-inverted"
            iconClassName="fill-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
