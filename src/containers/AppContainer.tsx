import { Fragment, Suspense, ReactNode, StrictMode } from "react";
import ConfigProvider from "@app/providers/ConfigProvider";
import RouterProvider from "@app/providers/RouterProvider";
import StoreProvider from "@app/providers/StoreProvider";
import ThemeProvider from "@app/providers/ThemeProvider";

import { type AppConfig } from "@app/config";

interface AppContainerProps {
  appConfig: AppConfig;
  requireAuth?: boolean;
  children?: ReactNode;
}

export function AppContainer({ appConfig = {}, requireAuth = false, children }: AppContainerProps) {
  const { components, containers } = appConfig || {};
  const { Loading = () => <div /> } = components || {};
  const { AppContainerFragment = Fragment } = containers || {};

  return (
    <StrictMode>
      <Suspense fallback={<Loading />}>
        <ConfigProvider appConfig={appConfig}>
          <StoreProvider>
            <ThemeProvider>
              <AppContainerFragment>
                <RouterProvider requireAuth={requireAuth}>{children}</RouterProvider>
              </AppContainerFragment>
            </ThemeProvider>
          </StoreProvider>
        </ConfigProvider>
      </Suspense>
    </StrictMode>
  );
}

export function withAppContainer(Component = null, appConfig: AppConfig = {}) {
  const requireAuth = (Component && Component.requireAuth) as boolean;

  return ({ ...props }) => {
    return Component ? (
      <AppContainer appConfig={appConfig} requireAuth={requireAuth}>
        <Component {...props} />
      </AppContainer>
    ) : (
      <AppContainer appConfig={appConfig} {...props} />
    );
  };
}

export default AppContainer;
