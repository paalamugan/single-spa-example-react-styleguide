import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  configureStore,
  combineReducers,
  ThunkAction,
  Action,
  ConfigureStoreOptions,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { baseApi } from "./apis";
import { sessionSlice, localeSlice, themeSlice } from "./features";

import { reduxStoreDistributor as storeDistributor } from "@single-spa-example/global";

const createStore = (options?: ConfigureStoreOptions["preloadedState"] | undefined) => {
  return configureStore({
    reducer: combineReducers({
      [baseApi.reducerPath]: baseApi.reducer,
      [sessionSlice.name]: sessionSlice.reducer,
      [localeSlice.name]: localeSlice.reducer,
      [themeSlice.name]: themeSlice.reducer,
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([baseApi.middleware]),
    devTools: process.env.NODE_ENV !== "production",
    ...options,
  });
};

const store = createStore();

// optional but required for refetchOnFocus and refetchOnReconnect behaviors.
// for more details see: https://redux-toolkit.js.org/rtk-query/api/setupListeners
setupListeners(store.dispatch);

// Register this store for global event distribution
storeDistributor.registerStore("styleguide", store);

export default store;

export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
