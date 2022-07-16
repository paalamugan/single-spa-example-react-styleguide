import { useEffect, createContext } from "react";
import { LOCALSTORAGE_SESSION_KEY } from "@app/constants";
import { useLocalStorage, useSession } from "@app/hooks";
import { useAppDispatch, setSession, logout } from "@app/store";
import Loading from "@app/components/Loading";
// import { useMeQuery } from "@app/store/apis/sessionApi";

export const AuthContext = createContext(null);

const AuthProvider = ({ persistKey = LOCALSTORAGE_SESSION_KEY, children }) => {
  const { user, auth, isAuthenticated } = useSession();
  const [persistSession, setPersistSession] = useLocalStorage(persistKey, null);

  // const { data: userData, isLoading } = useMeQuery("session/me");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!persistSession) return;
    dispatch(setSession(persistSession));
  }, [persistSession, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      setPersistSession({ user, auth });
    } else {
      setPersistSession(null);
    }
  }, [isAuthenticated, setPersistSession, user, auth]);

  const setNewSession = (session = {}) => {
    dispatch(setSession(session));
  };
  const clearSession = () => {
    dispatch(logout());
  };
  // useEffect(() => {
  //   if (isLoading) return;
  //   setPersistSession((session) => ({ ...session, user: userData }));
  // }, [isLoading]);

  // if (isAuthenticated) return children;
  return (
    <AuthContext.Provider
      value={{
        setSession: setNewSession,
        clearSession: clearSession,
        isAuthenticated,
        session: { auth, user },
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
