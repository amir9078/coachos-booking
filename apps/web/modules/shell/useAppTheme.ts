"use client";

import getBrandColours from "@coachos/lib/getBrandColours";
import useTheme from "@coachos/lib/hooks/useTheme";
import useMeQuery from "@coachos/trpc/react/hooks/useMeQuery";
import { useCalcomTheme } from "@coachos/ui/styles";

export const useAppTheme = () => {
  const { data: user } = useMeQuery();
  const brandTheme = getBrandColours({
    lightVal: user?.brandColor,
    darkVal: user?.darkBrandColor,
  });
  useCalcomTheme(brandTheme);
  useTheme(user?.appTheme);
};
