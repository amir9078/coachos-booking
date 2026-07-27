import { getAppRegistry } from "@coachos/app-store/_appRegistry";
import prisma from "@coachos/prisma";
import type { AppCategories } from "@coachos/prisma/enums";

export type CategoryDataProps = NonNullable<Awaited<ReturnType<typeof getStaticProps>>>;

export const getStaticProps = async (category: AppCategories) => {
  const appQuery = await prisma.app.findMany({
    where: {
      categories: {
        has: category,
      },
      enabled: true,
    },
    select: {
      slug: true,
    },
  });

  const dbAppsSlugs = appQuery.map((category) => category.slug);

  const appStore = await getAppRegistry();

  const apps = appStore.filter((app) => dbAppsSlugs.includes(app.slug));
  return {
    apps,
    category,
  };
};
