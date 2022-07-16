import { baseApi } from "./baseApi";
import { cacher } from "@app/utils";

const apiWithTags = baseApi.enhanceEndpoints({
  addTagTypes: [...cacher.defaultTags, "Session"],
});

export const sessionApi = apiWithTags.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<any, void>({
      query: () => "/session/me",
      providesTags: cacher.providesList("Session"),
    }),
  }),
});

export const { useMeQuery } = sessionApi;
