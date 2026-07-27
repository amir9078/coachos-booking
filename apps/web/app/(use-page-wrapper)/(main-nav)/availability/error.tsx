"use client";

import { useLocale } from "@coachos/lib/hooks/useLocale";
import { Alert } from "@coachos/ui/components/alert";

export default function Error() {
  const { t } = useLocale();
  return <Alert severity="error" title={t("something_went_wrong")} />;
}
