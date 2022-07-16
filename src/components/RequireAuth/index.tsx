import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSession } from "@app/hooks";

export const RequireAuth = () => {
  const { isAuthenticated } = useSession();
  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to={{
        pathname: "/login",
        search: `from=${location.pathname}`,
      }}
      state={{ from: location }}
      replace
    />
  );
};
