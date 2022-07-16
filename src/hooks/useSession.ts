import { useMemo } from "react";
import { selectSession, selectIsAuthenticated, useAppSelector } from "@app/store";

export const useSession = () => {
  const session = useAppSelector(selectSession);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  return useMemo(() => ({ ...session, isAuthenticated }), [session, isAuthenticated]);
};
