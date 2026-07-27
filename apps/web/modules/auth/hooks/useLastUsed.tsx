import { useState, useEffect } from "react";

import { useLocale } from "@coachos/lib/hooks/useLocale";
import { localStorage } from "@coachos/lib/webstorage";
import classNames from "@coachos/ui/classNames";

type LoginType = "saml" | "google" | "microsoft" | "credentials";

export function useLastUsed() {
  const [lastUsed, setLastUsed] = useState<LoginType>();

  useEffect(() => {
    const storedValue = localStorage.getItem("last_coachos_login");
    if (storedValue) {
      setLastUsed(storedValue as LoginType);
    }
  }, []);

  useEffect(() => {
    if (lastUsed) {
      localStorage.setItem("last_coachos_login", lastUsed);
    } else {
      localStorage.removeItem("last_coachos_login");
    }
  }, [lastUsed]);

  return [lastUsed, setLastUsed] as const;
}

export const LastUsed = ({ className }: { className?: string }) => {
  const { t } = useLocale();
  return (
    <span className={classNames("text-subtle absolute right-3 text-xs", className)}>{t("last_used")}</span>
  );
};
