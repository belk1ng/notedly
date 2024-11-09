import { darkThemeColors, lightThemeColors } from "./colors";
import { mixins } from "./mixins";

const general = {
  mixins,
};

export const lightTheme = {
  colors: lightThemeColors,
  ...general,
};

export const darkTheme = {
  colors: darkThemeColors,
  ...general,
};
