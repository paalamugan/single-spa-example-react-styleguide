import { useState, useEffect, createContext } from "react";
import { useLocalStorage } from "@app/hooks";
import { LOCALSTORAGE_LOCALE_KEY } from "@app/constants";
import { useAppDispatch, setLocale as setLocaleStore } from "@app/store";

export const LocaleContext = createContext(null);

export default function LocaleProvider({
  children,
  defaultLocale = "en",
  persistKey = LOCALSTORAGE_LOCALE_KEY,
}) {
  const [persistLocale, setPersistLocale] = useLocalStorage(persistKey, defaultLocale);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLocaleStore(persistLocale));
    setPersistLocale(persistLocale);
  }, [persistLocale, persistKey, setPersistLocale, dispatch]);

  return (
    <LocaleContext.Provider value={[persistLocale, setPersistLocale]}>
      {children}
    </LocaleContext.Provider>
  );
}

export const withLocale = (Component) => {
  const ChildComponent = (props) => {
    return (
      <LocaleContext.Consumer>
        {([locale, setLocale]) => {
          return <Component locale={locale} setLocale={setLocale} {...props} />;
        }}
      </LocaleContext.Consumer>
    );
  };

  return ChildComponent;
};
