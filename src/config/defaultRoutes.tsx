import { PageNotFound as _PageNotFound } from "@app/components";

const getDefaultRoutes = (appConfig) => {
  const { pages } = appConfig || {};
  const { PageNotFound = _PageNotFound } = pages || {};

  return [{ path: "*", element: <PageNotFound /> }];
};

export default getDefaultRoutes;
