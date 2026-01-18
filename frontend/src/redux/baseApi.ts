import {
  DefinitionType,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import type {
  FetchArgs,
  BaseQueryApi,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLogout } from "./features/user/authSlice";
import type { RootState } from "./store";

const URL = import.meta.env.VITE_BACKEND_URL as string;

const baseQuery = fetchBaseQuery({
  baseUrl: `${URL}/api`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) headers.set("admin-authorization", `${token}`);
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const res = await fetch(`${URL}/api/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    // update state
    if (data?.data?.adminAccessToken) {
      const user = (api.getState() as RootState).auth.loggedUser;
      api.dispatch(userLoggedIn({ user, token: data?.data?.adminAccessToken }));
    } else {
      api.dispatch(userLogout());
    }

    // retry the original request once
    result = await baseQuery(args, api, extraOptions);
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
  tagTypes: ["role", "permission", "user"],
});
