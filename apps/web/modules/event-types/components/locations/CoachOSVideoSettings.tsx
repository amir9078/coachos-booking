import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";

import { useIsPlatform } from "@coachos/atoms/hooks/useIsPlatform";
import type { FormValues } from "@coachos/features/eventtypes/lib/types";
import type { CoachOSVideoSettings as CoachOSVideoSettingsType } from "@coachos/features/eventtypes/lib/types";
import { useLocale } from "@coachos/lib/hooks/useLocale";
import classNames from "@coachos/ui/classNames";
import { TextField } from "@coachos/ui/components/form";
import { SettingsToggle } from "@coachos/ui/components/form";
import { Icon } from "@coachos/ui/components/icon";
import { Tooltip } from "@coachos/ui/components/tooltip";
import LocationSettingsContainer from "@coachos/web/modules/event-types/components/locations/LocationSettingsContainer";
import { InfoBadge } from "@coachos/ui/components/badge";

const CoachOSVideoSettings = ({ coachosVideoSettings }: { coachosVideoSettings?: CoachOSVideoSettingsType }) => {
  const { t } = useLocale();
  const formMethods = useFormContext<FormValues>();
  const isPlatform = useIsPlatform();
  const [isExpanded, setIsExpanded] = useState(false);
  const [parent] = useAutoAnimate<HTMLDivElement>();
  const hasTeamPlan = false;
  return (
    <>
      <Tooltip content="expandable" side="right" className="lg:hidden">
        <button
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
          className={classNames(
            "cursor-pointer todesktop:py-[7px] text-default group flex w-full items-center rounded-md px-2 pt-1.5 text-sm font-medium transition",
            "[&[aria-current='page']]:!bg-transparent",
            "[&[aria-current='page']]:text-emphasis mt-0.5 text-sm"
          )}>
          <span className="hidden w-full justify-between truncate text-ellipsis lg:flex">
            {!isExpanded ? t("show_advanced_settings") : t("hide_advanced_settings")}
          </span>
          <Icon name={isExpanded ? "chevron-up" : "chevron-down"} className="ml-auto h-4 w-4" />
        </button>
      </Tooltip>
      <div ref={parent}>
        {isExpanded && (
          <LocationSettingsContainer>
            <Controller
              name="coachosVideoSettings.disableRecordingForGuests"
              defaultValue={!!coachosVideoSettings?.disableRecordingForGuests}
              render={({ field: { onChange, value } }) => {
                return (
                  <SettingsToggle
                    title={t("disable_recording_for_guests")}
                    labelClassName="text-sm leading-6 whitespace-normal wrap-break-word"
                    checked={value}
                    disabled={!hasTeamPlan}
                    onCheckedChange={onChange}
                    Badge={undefined}
                  />
                );
              }}
            />

            <Controller
              name="coachosVideoSettings.disableRecordingForOrganizer"
              defaultValue={!!coachosVideoSettings?.disableRecordingForOrganizer}
              render={({ field: { onChange, value } }) => {
                return (
                  <SettingsToggle
                    title={t("disable_recording_for_organizer")}
                    labelClassName="text-sm leading-6 whitespace-normal wrap-break-word"
                    checked={value}
                    disabled={!hasTeamPlan}
                    onCheckedChange={onChange}
                    Badge={undefined}
                  />
                );
              }}
            />

            {!isPlatform && (
              <Controller
                name="coachosVideoSettings.enableAutomaticRecordingForOrganizer"
                defaultValue={!!coachosVideoSettings?.enableAutomaticRecordingForOrganizer}
                render={({ field: { onChange, value } }) => {
                  return (
                    <SettingsToggle
                      title={t("enable_automatic_recording")}
                      labelClassName="text-sm"
                      checked={value}
                      disabled={!hasTeamPlan}
                      onCheckedChange={onChange}
                      Badge={undefined}
                    />
                  );
                }}
              />
            )}

            <Controller
              name="coachosVideoSettings.enableAutomaticTranscription"
              defaultValue={!!coachosVideoSettings?.enableAutomaticTranscription}
              render={({ field: { onChange, value } }) => {
                return (
                  <SettingsToggle
                    title={t("enable_automatic_transcription")}
                    labelClassName="text-sm leading-6 whitespace-normal wrap-break-word"
                    checked={value}
                    disabled={!hasTeamPlan}
                    onCheckedChange={onChange}
                    Badge={undefined}
                  />
                );
              }}
            />

            {!isPlatform && (
              <Controller
                name="coachosVideoSettings.disableTranscriptionForGuests"
                defaultValue={!!coachosVideoSettings?.disableTranscriptionForGuests}
                render={({ field: { onChange, value } }) => {
                  return (
                    <SettingsToggle
                      title={t("disable_transcription_for_guests")}
                      labelClassName="text-sm leading-6 whitespace-normal wrap-break-word"
                      checked={value}
                      disabled={!hasTeamPlan}
                      onCheckedChange={onChange}
                      Badge={undefined}
                    />
                  );
                }}
              />
            )}
            {!isPlatform && (
              <Controller
                name="coachosVideoSettings.disableTranscriptionForOrganizer"
                defaultValue={!!coachosVideoSettings?.disableTranscriptionForOrganizer}
                render={({ field: { onChange, value } }) => {
                  return (
                    <SettingsToggle
                      title={t("disable_transcription_for_organizer")}
                      labelClassName="text-sm leading-6 whitespace-normal wrap-break-word"
                      checked={value}
                      disabled={!hasTeamPlan}
                      onCheckedChange={onChange}
                      Badge={undefined}
                    />
                  );
                }}
              />
            )}

            <Controller
              name="coachosVideoSettings.requireEmailForGuests"
              defaultValue={!!coachosVideoSettings?.requireEmailForGuests}
              render={({ field: { onChange, value } }) => {
                return (
                  <SettingsToggle
                    title={t("require_email_for_guests")}
                    description={t("require_email_for_guests_description")}
                    labelClassName="text-sm leading-6 whitespace-normal break-words"
                    checked={value}
                    disabled={!hasTeamPlan}
                    onCheckedChange={onChange}
                    Badge={undefined}
                  />
                );
              }}
            />

            <TextField
              label={
                <div className="flex gap-1 items-center">
                  {t("redirect_url")}
                  <InfoBadge content={t("enter_redirect_url_on_exit_description")} />
                </div>
              }
              defaultValue={coachosVideoSettings?.redirectUrlOnExit || ""}
              data-testid="coachosVideoSettings.redirectUrlOnExit"
              containerClassName="mt-4"
              className="leading-6"
              {...formMethods.register("coachosVideoSettings.redirectUrlOnExit", {
                setValueAs: (v) => (!v || v.trim() === "" ? null : v),
              })}
            />
            <ErrorMessage
              errors={formMethods.formState.errors?.coachosVideoSettings}
              name="redirectUrlOnExit"
              className={classNames("text-error text-sm")}
              as="div"
              id="coachosVideoSettings.redirectUrlOnExit-error"
            />
          </LocationSettingsContainer>
        )}
      </div>
    </>
  );
};

export default CoachOSVideoSettings;
