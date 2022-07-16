import {
  type PaletteMode,
  type Theme,
  createTheme as createMuiTheme,
} from "@single-spa-example/react-mui";
import defaultThemes, { type ConfigThemeOptions } from "@app/config/themes";
import { createComponents } from "./components";
import { createPalette } from "./palette";
import { createTypography } from "./typography";

/**
 * Creates a customized version of Material UI theme.
 *
 * @see https://mui.com/customization/theming/
 * @see https://mui.com/customization/default-theme/
 */
function createTheme(
  mode: PaletteMode,
  { palette, components, typography, ...themeOptions }: Theme | any = {},
): Theme {
  return createMuiTheme({
    palette: createPalette(mode, palette),
    components: createComponents(mode, components),
    typography: createTypography(mode, typography),
    ...themeOptions,
  });
}

const getThemeSource = (
  themeId: string,
  themes: ConfigThemeOptions[] = defaultThemes,
  isDarkMode: boolean,
) => {
  const mode = isDarkMode ? "dark" : "light";
  const theme = themes?.find?.((theme) => theme.id === themeId);

  if (!theme) {
    return createTheme(mode);
  }

  return createTheme(mode, theme.source);
};

export default getThemeSource;
