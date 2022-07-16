import { useState, useLayoutEffect, Suspense, lazy } from "react";
import { Router, Routes, Route, Outlet } from "react-router-dom";
import history from "@app/router/history";
import { useConfig } from "@app/hooks";

const LayoutContainer = lazy(() => import("@app/containers/LayoutContainer"));

export default function RouterProvider({ requireAuth, children, ...props }) {
  const { appConfig } = useConfig();

  const { pages, components } = appConfig;
  const { LandingPage = false } = pages || {};
  const { Loading = () => <div /> } = components || {};

  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), []);

  return (
    <Router {...props} location={state.location} navigationType={state.action} navigator={history}>
      <Routes>
        {LandingPage && (
          <Route path="/" element={<Outlet />}>
            <Route index element={<LandingPage />} />
          </Route>
        )}
        <Route
          path="*"
          element={
            <Suspense fallback={<Loading />}>
              <LayoutContainer requireAuth={requireAuth}>{children}</LayoutContainer>
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

export const withRouter = (Component, { appConfig = {} } = {}) => {
  const requireAuth = (Component.requireAuth as boolean) || false;
  return ({ children, ...props }) => {
    return (
      <RouterProvider appConfig={appConfig} requireAuth={requireAuth}>
        <Component {...props} />
      </RouterProvider>
    );
  };
};
