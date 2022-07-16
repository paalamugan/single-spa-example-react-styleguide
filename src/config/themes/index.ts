import { blue, green, teal, type Theme } from "@single-spa-example/react-mui";

export type ConfigThemeOptions = {
  id: "default" | "appDefaultTheme" | "blue" | "green";
  color?: string;
  source?: Theme | unknown;
};

export type ConfigThemeId = ConfigThemeOptions["id"];

const themes: Array<ConfigThemeOptions> = [
  {
    id: "default",
  },
  {
    id: "appDefaultTheme",
    color: "inherit",
    source: {
      palette: {
        primary: {
          light: "#3e686f",
          main: "#21444a",
          dark: "#1f3233",
        },
        secondary: {
          light: teal[300],
          main: "#457164",
          dark: teal[900],
        },
      },
    },
  },
  {
    id: "blue",
    color: blue[500],
    source: {
      palette: {
        primary: blue[600],
        secondary: green[600],
      },
    },
  },
  {
    id: "green",
    color: green[500],
    source: {
      palette: {
        primary: green[600],
        secondary: blue[600],
      },
    },
  },
];

export default themes;
