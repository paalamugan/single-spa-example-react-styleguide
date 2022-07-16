import { useContext } from "react";
import { LocaleContext } from "@app/providers/LocaleProvider";
import { selectLocale, useAppSelector } from "@app/store";
export function useLocale() {
  const [, setLocale] = useContext(LocaleContext);
  const locale = useAppSelector(selectLocale);
  return [locale, setLocale];
}
