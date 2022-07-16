import { type PaletteMode, type PaletteOptions } from "@single-spa-example/react-mui";
/**
 * Customized Material UI color palette.
 *
 * @see https://mui.com/customization/palette/
 * @see https://mui.com/customization/default-theme/?expand-path=$.palette
 */
const createPalette = (mode: PaletteMode, palette: PaletteOptions): PaletteOptions => ({
  mode,
  background: {
    default: mode === "light" ? "#fff" : "#121212",
  },
  ...palette,
});

export { createPalette };
