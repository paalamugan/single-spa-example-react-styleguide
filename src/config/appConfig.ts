import { parseLanguages } from "@app/utils/locale";
import {
  LOCALSTORAGE_SESSION_KEY,
  LOCALSTORAGE_LOCALE_KEY,
  LOCALSTORAGE_THEME_KEY,
} from "@app/constants";

import defaultThemes, { ConfigThemeOptions, ConfigThemeId } from "./themes";
import defaultLocales from "./locales";
import defaultRoutes from "./defaultRoutes";

const supportedLanguages = defaultLocales.map((locale) => locale.locale);
const defaultLang = defaultLocales[0].locale;

export type AppConfig = {
  getDefaultRoutes?: (appConfig: AppConfig) => {
    path: string;
    element: JSX.Element;
  }[];
  routes?: {
    [key: string]: any;
  }[];
  components?: {
    [key: string]: any;
  };
  containers?: {
    [key: string]: any;
  };
  pages?: {
    [key: string]: any;
  };
  auth?: {
    signInURL: string;
    signOutURL: string;
    redirectTo: string;
    persistKey: string;
  };
  theme?: {
    themes: ConfigThemeOptions[];
    defaultThemes?: ConfigThemeOptions[];
    defaultThemeId?: ConfigThemeId;
    persistKey?: string;
  };
  locale?: {
    locales: {
      locale: string;
      messages: Promise<typeof import("@app/config/locales/en")>;
    }[];
    defaultLocales?: {
      locale: string;
      messages: Promise<typeof import("@app/config/locales/en")>;
    }[];
    defaultLocale?: string;
    persistKey?: string;
    onError?: (e: any) => void;
  };
};

const appConfig: AppConfig = {
  getDefaultRoutes: defaultRoutes,
  routes: [],
  components: {},
  containers: {},
  pages: {},
  auth: {
    signInURL: "/signin",
    signOutURL: "/signout",
    redirectTo: "/",
    persistKey: LOCALSTORAGE_SESSION_KEY,
  },
  theme: {
    themes: [],
    defaultThemes,
    defaultThemeId: "appDefaultTheme",
    persistKey: LOCALSTORAGE_THEME_KEY,
  },
  locale: {
    locales: [],
    defaultLocales,
    defaultLocale: parseLanguages(supportedLanguages, defaultLang),
    persistKey: LOCALSTORAGE_LOCALE_KEY,
    onError: (e) => {
      // Here we warn the user about translation error
      //console.warn(e)
      return;
    },
  },
};
export default appConfig;
