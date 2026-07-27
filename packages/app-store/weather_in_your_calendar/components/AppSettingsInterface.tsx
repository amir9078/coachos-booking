import { useState } from "react";

import { useLocale } from "@coachos/lib/hooks/useLocale";
import { Button } from "@coachos/ui/components/button";
import { TextField } from "@coachos/ui/components/form";

export default function AppSettings() {
  const { t } = useLocale();
  const unit = "metric";
  const [location, setLocation] = useState("");

  return (
    <div className="stack-y-4 text-sm">
      <TextField
        placeholder="San Francisco"
        value={location}
        name="Enter City"
        onChange={async (e) => {
          setLocation(e.target.value);
        }}
      />
      <Button
        href={`webcal://weather-in-calendar.com/cal/weather-cal.php?city=${location}&units=${unit}&temperature=day`}>
        {t("add_to_calendar")}
      </Button>
    </div>
  );
}
