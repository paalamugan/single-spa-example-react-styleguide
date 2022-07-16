//import areIntlLocalesSupported from 'intl-locales-supported'
//import intl from 'intl'
import { defineMessages } from "react-intl";

/*
export const loadLocalePolyfill = (locale) => {
  // START: Intl polyfill
  // Required for working on Safari
  // Code from here: https://formatjs.io/guides/runtime-environments/
  let localesMyAppSupports = [locale]
  if (global.Intl) {
    // Determine if the built-in `Intl` has the locale data we need.
    if (!areIntlLocalesSupported(localesMyAppSupports)) {
      // `Intl` exists, but it doesn't have the data we need, so load the
      // polyfill and replace the constructors with need with the polyfill's.
      let IntlPolyfill = intl
      Intl.NumberFormat = IntlPolyfill.NumberFormat
      Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat
    }
  } else {
    // No `Intl`, so use and load the polyfill.
    global.Intl = intl
  }
  // END: Intl polyfill
}
*/

const getUsersPreferredLanguages = () => {
  if (navigator.languages !== undefined) {
    return navigator.languages;
  } else if (navigator.language !== undefined) {
    return [navigator.language];
  } else {
    return undefined;
  }
};

export const formatMessage = (messages = [], id) => {
  return messages[id] || id;
};

export const parseLanguages = (acceptedLangs, defaultLang = "") => {
  const userPref = getUsersPreferredLanguages();

  const match = userPref.find((lang) => acceptedLangs.includes(lang));

  if (!match && defaultLang) {
    return defaultLang;
  }

  return match;
};

export const getLocaleMessages = async (locale, locales): Promise<Record<string, string>> => {
  if (!locales || !locales.length) return {};

  for (const localeItem of locales) {
    if (localeItem.locale === locale) {
      const { default: messages } = await defineMessages(localeItem.messages);
      return messages as Record<string, string>;
    }
  }
};
