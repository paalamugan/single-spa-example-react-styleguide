import { Suspense, useEffect, useState, StrictMode, ReactNode, Fragment } from "react";
import { IntlProvider } from "react-intl";
import { useRoutes } from "react-router-dom";
import { getLocaleMessages } from "@app/utils/locale";
import { useLocale, useConfig } from "@app/hooks";
import LocaleProvider from "@app/providers/LocaleProvider";
import AuthProvider from "@app/providers/AuthProvider";
import ThemeProvider from "@app/providers/ThemeProvider";
import ConfigProvider from "@app/providers/ConfigProvider";
import StoreProvider from "@app/providers/StoreProvider";
import DefaultLoading from "@app/components/Loading";

import type { AppConfig } from "@app/config";

interface WrapperLayoutProps {
  appConfig: AppConfig;
  children: ReactNode;
}

const loadPloyfillLocales = async (locale, locales) => {
  if (!locales || !locales.length) return;

  for (const localeObj of locales) {
    if (localeObj.locale === locale) {
      if (localeObj.loadData) {
        await localeObj.loadData;
      }
    }
  }
};

const WrapperLayoutWithRouter = ({
  LayoutContainerFragment,
  locale,
  messages,
  onError,
  Loading,
  routes,
  defaultRoutes,
}) => {
  return (
    <IntlProvider locale={locale} key={locale} messages={messages} onError={onError}>
      <LayoutContainerFragment>
        <Suspense fallback={<Loading />}>{useRoutes([...routes, ...defaultRoutes])}</Suspense>
      </LayoutContainerFragment>
    </IntlProvider>
  );
};

const WrapperLayout = ({ appConfig = {}, children }: WrapperLayoutProps) => {
  const [messages, setMessages] = useState<Record<string, string>>({});
  const {
    components,
    routes = [],
    containers,
    locale: confLocale,
    getDefaultRoutes,
  } = appConfig || {};
  const { Loading = DefaultLoading } = components || {};
  const { defaultLocales, locales, onError } = confLocale || {};
  const { LayoutContainerFragment = Fragment } = containers || {};
  const defaultRoutes = getDefaultRoutes ? getDefaultRoutes(appConfig) : [];
  const [locale = ""] = useLocale();

  useEffect(() => {
    const loadPolyfills = async () => {
      //loadLocalePolyfill(locale)
      loadPloyfillLocales(locale, defaultLocales);
      loadPloyfillLocales(locale, locales);
    };
    loadPolyfills();
  }, [locale, locales, defaultLocales]);

  useEffect(() => {
    const loadMessages = async () => {
      const globalMessages = await getLocaleMessages(locale, defaultLocales);
      const messages = await getLocaleMessages(locale, locales);
      setMessages({ ...globalMessages, ...messages });
    };
    loadMessages();
  }, [locale, locales, defaultLocales]);

  if (!routes.length) {
    return (
      <IntlProvider locale={locale} key={locale} messages={messages} onError={onError}>
        <LayoutContainerFragment>{children}</LayoutContainerFragment>
      </IntlProvider>
    );
  }

  return (
    <WrapperLayoutWithRouter
      LayoutContainerFragment={LayoutContainerFragment}
      locale={locale}
      key={locale}
      messages={messages}
      onError={onError}
      Loading={Loading}
      routes={routes}
      defaultRoutes={defaultRoutes}
    />
  );
};

export const LayoutContainer = ({ children, requireAuth = false }) => {
  const { appConfig } = useConfig();
  const { locale, auth } = appConfig || {};
  const { persistKey: persistAuthKey } = auth || {};
  const { defaultLocale, persistKey: persistLocaleKey } = locale || {};

  return (
    <LocaleProvider defaultLocale={defaultLocale} persistKey={persistLocaleKey}>
      {requireAuth ? (
        <AuthProvider persistKey={persistAuthKey}>
          <WrapperLayout appConfig={appConfig}>{children}</WrapperLayout>
        </AuthProvider>
      ) : (
        <WrapperLayout appConfig={appConfig}>{children}</WrapperLayout>
      )}
    </LocaleProvider>
  );
};

export const WithLayoutContainer = (Component, { appConfig }) => {
  return (props) => {
    return (
      <StrictMode>
        <ConfigProvider appConfig={appConfig}>
          <StoreProvider>
            <ThemeProvider>
              <LayoutContainer requireAuth={Component.requireAuth}>
                <Component {...props} />
              </LayoutContainer>
            </ThemeProvider>
          </StoreProvider>
        </ConfigProvider>
      </StrictMode>
    );
  };
};

export default LayoutContainer;
