import { useFlagMap } from "@coachos/features/flags/context/provider";
import { APP_NAME } from "@coachos/lib/constants";
import { useLocale } from "@coachos/lib/hooks/useLocale";
import { trpc } from "@coachos/trpc/react";
import { showToast } from "@coachos/ui/components/toast";
import { TopBanner } from "@coachos/ui/components/top-banner";

export type VerifyEmailBannerProps = {
  data: boolean;
};

function VerifyEmailBanner({ data }: VerifyEmailBannerProps) {
  const flags = useFlagMap();
  const { t } = useLocale();
  const mutation = trpc.viewer.auth.resendVerifyEmail.useMutation();

  if (!data || !flags["email-verification"]) return null;

  return (
    <>
      <TopBanner
        icon="mail"
        text={t("verify_email_banner_body", { appName: APP_NAME })}
        variant="warning"
        actions={
          <a
            className="underline hover:cursor-pointer"
            onClick={() => {
              mutation.mutate();
              showToast(t("email_sent"), "success");
            }}>
            {t("resend_email")}
          </a>
        }
      />
    </>
  );
}

export default VerifyEmailBanner;
