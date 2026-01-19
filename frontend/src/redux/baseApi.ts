import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { FetchArgs, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { userLogout } from "./features/user/authSlice";
import type { RootState } from "./store";
import { CONFIG } from "@/config";

const baseQuery = fetchBaseQuery({
  baseUrl: CONFIG.API_PATH,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) headers.set("admin-authorization", `${token}`);
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  unknown,
  unknown
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    api.dispatch(userLogout());
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
  tagTypes: [
    "role",
    "permission",
    "user",
    "contact",
    "generalSetting",
    "banner",
    "gtm",
    "about",
    "team",
    "management",
    "seo",
  ],
});
