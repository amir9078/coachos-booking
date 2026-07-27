import useGetBrandingColours from "@coachos/lib/getBrandColours";
import useTheme from "@coachos/lib/hooks/useTheme";
import { useCalcomTheme } from "@coachos/ui/styles";

export const useBrandColors = ({
  brandColor,
  darkBrandColor,
  theme,
}: {
  brandColor?: string;
  darkBrandColor?: string;
  theme?: string | null;
}) => {
  const brandTheme = useGetBrandingColours({
    lightVal: brandColor,
    darkVal: darkBrandColor,
  });

  useCalcomTheme(brandTheme);
  useTheme(theme);
};
