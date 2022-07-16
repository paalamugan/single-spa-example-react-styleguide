import { createSlice } from "@reduxjs/toolkit";

import { isTokenExpired } from "@app/utils/common";
import { AppState } from "@app/store/store";
import { sessionApi } from "@app/store/apis";

interface initialStateProps {
  user: any | null;
  auth: {
    provider: string | null;
    token: string | null;
    expiresIn: string | null;
  };
}

const initialState = {
  user: null,
  auth: {
    provider: null,
    token: null,
    expiresIn: null,
  },
};

function isAuthenticated({ user = null, auth = null }: initialStateProps) {
  return !!user && !!auth?.token && !isTokenExpired(auth?.expiresIn);
}

const setSessionReducer = (state, action) => {
  const { user, auth, token, expiresIn, provider } = action.payload || {};
  state.user = user || null;
  state.auth = auth || {
    token,
    expiresIn,
    provider,
  };
};

const setAuthReducer = (state, action) => {
  state.auth = {
    ...state.auth,
    ...action.payload,
  };
};

const setUserReducer = (state, action) => {
  state.user = {
    ...state.user,
    ...action.payload,
  };
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: setSessionReducer,
    setAuth: setAuthReducer,
    setUser: setUserReducer,
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(sessionApi.endpoints.me.matchPending, (state, action) => {
        // console.log("me pending", action);
      })
      .addMatcher(sessionApi.endpoints.me.matchFulfilled, setUserReducer)
      .addMatcher(sessionApi.endpoints.me.matchRejected, (state, action) => {
        // console.log("me rejected", action);
      });
  },
});

export const { setSession, setUser, setAuth, logout } = sessionSlice.actions;

export const selectSession = (state: AppState) => state.session;
export const selectCurrentUser = (state: AppState) => state.session.user;
export const selectAuth = (state: AppState) => state.session.auth;
export const selectIsAuthenticated = (state: AppState) => isAuthenticated(state.session);
