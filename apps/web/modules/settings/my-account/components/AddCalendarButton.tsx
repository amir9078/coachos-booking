"use client";

import { useLocale } from "@coachos/lib/hooks/useLocale";
import { Button } from "@coachos/ui/components/button";

const AddCalendarButton = () => {
  const { t } = useLocale();

  return (
    <>
      <Button color="secondary" StartIcon="plus" href="/apps/categories/calendar">
        {t("add_calendar")}
      </Button>
    </>
  );
};

export default AddCalendarButton;
