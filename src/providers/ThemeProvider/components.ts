import type { PaletteMode, ThemeOptions } from "@single-spa-example/react-mui";

type Func = (
  mode: PaletteMode,
  components: ThemeOptions["components"],
) => NonNullable<ThemeOptions["components"]>;

/**
 * Style overrides for Material UI components.
 *
 * @see https://github.com/mui-org/material-ui/tree/master/packages/mui-material/src
 */
const createComponents: Func = (_mode, components) => ({
  MuiLink: {
    defaultProps: {
      color: "inherit",
      underline: "none",
      // onClick: handleClick,
    },
  },

  MuiTextField: {
    defaultProps: {
      InputLabelProps: { shrink: true },
    },
  },

  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "none",
        borderRadius: "100vw",
      },
      contained: {
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none",
        },
      },
    },
  },

  MuiButtonGroup: {
    styleOverrides: {
      root: {
        boxShadow: "none",
      },
    },
  },

  MuiDialogTitle: {
    styleOverrides: {
      root: {
        fontSize: "1.125rem",
      },
    },
  },

  MuiTypography: {
    styleOverrides: {
      root: {
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
      },
    },
  },
  ...components,
});

function isModifiedEvent(event: React.MouseEvent): boolean {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

function handleClick(event: React.MouseEvent<HTMLAnchorElement>): void {
  const { target } = event.currentTarget;
  if (
    !event.defaultPrevented && // onClick prevented default
    event.button === 0 && // ignore everything but left clicks
    (!target || target === "_self") && // let browser handle "target=_blank" etc.
    !isModifiedEvent(event) // ignore clicks with modifier keys
  ) {
    event.preventDefault();
    const { href } = event.currentTarget;
    import("history/browser").then((x) => x.default.push(href));
  }
}

export { createComponents };
