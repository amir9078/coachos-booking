import type { Dispatch, SetStateAction } from "react";
import { Controller, useFormContext } from "react-hook-form";

import type { FormValues, SettingsToggleClassNames } from "@coachos/features/eventtypes/lib/types";
import { useLocale } from "@coachos/lib/hooks/useLocale";
import { SettingsToggle } from "@coachos/ui/components/form";
import classNames from "@coachos/ui/classNames";

const AssignAllTeamMembers = ({
  assignAllTeamMembers,
  setAssignAllTeamMembers,
  onActive,
  onInactive,
  customClassNames,
}: {
  assignAllTeamMembers: boolean;
  setAssignAllTeamMembers: Dispatch<SetStateAction<boolean>>;
  onActive: () => void;
  onInactive?: () => void;
  customClassNames?: SettingsToggleClassNames;
}) => {
  const { t } = useLocale();
  const { setValue } = useFormContext<FormValues>();

  return (
    <Controller<FormValues>
      name="assignAllTeamMembers"
      render={() => (
        <SettingsToggle
          data-testid="assign-all-team-members-toggle"
          title={t("automatically_add_all_team_members")}
          labelClassName={classNames("mt-[3px] text-sm", customClassNames?.label)}
          switchContainerClassName={customClassNames?.container}
          checked={assignAllTeamMembers}
          onCheckedChange={(active) => {
            setValue("assignAllTeamMembers", active, { shouldDirty: true });
            setAssignAllTeamMembers(active);
            if (active) {
              onActive();
            } else if (!!onInactive) {
              onInactive();
            }
          }}
        />
      )}
    />
  );
};

export default AssignAllTeamMembers;
