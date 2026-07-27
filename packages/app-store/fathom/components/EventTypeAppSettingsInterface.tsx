import type { EventTypeAppSettingsComponent } from "@coachos/app-store/types";
import { TextField } from "@coachos/ui/components/form";

const EventTypeAppSettingsInterface: EventTypeAppSettingsComponent = ({
  getAppData,
  setAppData,
  disabled,
  slug,
}) => {
  const trackingId = getAppData("trackingId");

  return (
    <TextField
      dataTestid={slug}
      name="Tracking ID"
      value={trackingId}
      disabled={disabled}
      onChange={(e) => {
        setAppData("trackingId", e.target.value);
      }}
    />
  );
};

export default EventTypeAppSettingsInterface;
