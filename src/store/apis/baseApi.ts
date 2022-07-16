/* eslint-disable no-console */
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import config from "@app/config/defaultConfig";

import { setAuth, logout } from "../features";

const getBaseQuery = fetchBaseQuery({
  baseUrl: config.apiEndPoint,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as any).session.auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await getBaseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log("Sending refresh token...");
    // send refresh token to get new access token
    const refreshResult = await getBaseQuery("/refreshToken", api, extraOptions);
    // console.log(refreshResult);
    const { data } = refreshResult as { data: { accessToken: string; expiresIn: string } };
    if (data) {
      // store the new token
      api.dispatch(
        setAuth({
          token: data?.accessToken,
          expiresIn: data?.expiresIn,
        } as any),
      );
      // retry the original query with new access token
      result = await getBaseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

const baseQueryWithRetry = retry(baseQueryWithReAuth, { maxRetries: 2 });

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRetry,
  endpoints: (builder) => ({}),
});
