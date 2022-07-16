import { type ThemeOptions } from "@single-spa-example/react-mui";

type Func = (mode, typography) => NonNullable<ThemeOptions["typography"]>;

/**
 * Customized Material UI typography.
 *
 * @see https://mui.com/customization/typography/
 * @see https://mui.com/customization/default-theme/?expand-path=$.typography
 */
const createTypography: Func = (_mode, typography) => ({
  fontFamily: [
    `system-ui`,
    `-apple-system`,
    `BlinkMacSystemFont`,
    `'Segoe UI'`,
    `Helvetica`,
    `Arial`,
    `sans-serif`,
    `'Apple Color Emoji'`,
    `'Segoe UI Emoji'`,
    `'Segoe UI Symbol'`,
  ].join(","),
  h1: {
    fontSize: "2.5rem",
  },
  h2: {
    fontSize: "2rem",
  },
  h3: {
    fontSize: "1.75rem",
  },
  h4: {
    fontSize: "1.5rem",
  },
  h5: {
    fontSize: "1.25rem",
  },
  h6: {
    fontSize: "1rem",
  },
  ...typography,
});

export { createTypography };
