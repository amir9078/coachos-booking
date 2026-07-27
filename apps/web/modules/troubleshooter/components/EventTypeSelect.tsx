import { EventTypeSelectComponent } from "@coachos/features/troubleshooter/components/EventTypeSelectComponent";
import { trpc } from "@coachos/trpc/react";

export { EventTypeSelectComponent };

export function EventTypeSelect(): JSX.Element {
  const { data: eventTypes, isPending } = trpc.viewer.eventTypes.listWithTeam.useQuery();

  return <EventTypeSelectComponent eventTypes={eventTypes ?? []} isPending={isPending} />;
}
