import type { ReactNode } from "react";

import classNames from "@coachos/ui/classNames";

import { useAtomsContext } from "../../hooks/useAtomsContext";
import { COACHOS_ATOMS_WRAPPER_CLASS } from "../constants/styles";

export const AtomsWrapper = ({
  children,
  customClassName,
}: {
  children: ReactNode;
  customClassName?: string;
}) => {
  const { options } = useAtomsContext();
  return (
    <div
      dir={options?.readingDirection ?? "ltr"}
      className={classNames(`${COACHOS_ATOMS_WRAPPER_CLASS} m-0 w-auto bg-transparent p-0`, customClassName)}>
      {children}
    </div>
  );
};
