import { useEffect, useCallback, useMemo, createContext } from "react";
import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  StyledEngineProvider,
  useMediaQuery,
  type Theme,
} from "@single-spa-example/react-mui";

import { useLocalStorage, useConfig } from "@app/hooks";
import { LOCALSTORAGE_THEME_KEY } from "@app/constants";
import { useAppSelector, useAppDispatch, toggleDarkMode, selectIsDarkMode } from "@app/store";
import getThemeSource from "./getThemeSource";

export interface ThemeProviderProps {
  children: React.ReactNode;
  persistKey?: string;
}

export interface ThemeContextProps {
  themeId: string;
  setThemeId: (themeId: string) => void;
  isDarkMode: boolean;
  toggleDarkTheme: () => void;
  theme: Theme;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: null,
  themeId: "",
  setThemeId: () => null,
  isDarkMode: false,
  toggleDarkTheme: () => null,
});

export default function ThemeProvider({
  children,
  persistKey = LOCALSTORAGE_THEME_KEY,
}: ThemeProviderProps): JSX.Element {
  const { appConfig } = useConfig();

  const { theme: themeConfig } = appConfig || {};
  const { defaultThemeId, defaultThemes = [], themes: customThemes = [] } = themeConfig || {};

  const themes = useMemo(() => [...defaultThemes, ...customThemes], [defaultThemes, customThemes]);

  const themeIdKey = `${persistKey}:themeId`;
  const [themeId, setThemeId] = useLocalStorage(themeIdKey, defaultThemeId);

  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const isDarkMode = useAppSelector(selectIsDarkMode);
  const isDarkModeKey = `${persistKey}:isDarkMode`;
  const [persistIsDarkMode, persistSetIsDarkMode] = useLocalStorage(isDarkModeKey, false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(toggleDarkMode(persistIsDarkMode));
    document.body.classList.toggle("dark", persistIsDarkMode);
  }, [persistIsDarkMode, dispatch]);

  // useEffect(() => {
  //   if (persistIsDarkMode !== "") return;
  //   const timer = setTimeout(() => {
  //     persistSetIsDarkMode(prefersDarkMode);
  //   });
  //   return () => clearTimeout(timer);
  // }, [prefersDarkMode]);

  const toggleDarkTheme = useCallback(() => {
    persistSetIsDarkMode(!isDarkMode);
  }, [isDarkMode, persistSetIsDarkMode]);

  useEffect(() => {
    setThemeId(themeId);
  }, [themeId, setThemeId]);

  const theme = useMemo(
    () => getThemeSource(themeId, themes, isDarkMode),
    [themeId, themes, isDarkMode],
  );

  return (
    <ThemeContext.Provider value={{ theme, themeId, setThemeId, isDarkMode, toggleDarkTheme }}>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
      </StyledEngineProvider>
    </ThemeContext.Provider>
  );
}

export const withTheme = (Component) => {
  const ChildComponent = (props) => {
    return (
      <ThemeContext.Consumer>
        {({ theme, themeId, setThemeId, isDarkMode, toggleDarkTheme }) => {
          return (
            <Component
              theme={theme}
              themeId={themeId}
              setThemeId={setThemeId}
              isDarkMode={isDarkMode}
              toggleDarkTheme={toggleDarkTheme}
              {...props}
            />
          );
        }}
      </ThemeContext.Consumer>
    );
  };

  return ChildComponent;
};
