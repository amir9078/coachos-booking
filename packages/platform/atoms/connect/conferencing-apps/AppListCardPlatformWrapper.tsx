import type { AppListCardProps } from "@coachos/ui/components/app-list-card";
import { AppListCard } from "@coachos/ui/components/app-list-card";

export default function AppListCardPlatformWrapper(props: AppListCardProps) {
  const logo = `https://app.amir9078.github.io${props.logo}`;
  return <AppListCard {...props} logo={logo} />;
}
