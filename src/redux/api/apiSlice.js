import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  setToken,
  setRefreshToken,
  clearUser,
  clearToken,
  clearRefreshToken,
} from "../auth/authSlice";
import { store } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_AUTH_URL}/`,
  // credentials: "include",

  prepareHeaders: async (headers) => {
    const token = await store.getState().auth?.user;
    if (token?.access_token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
      onSuccess: (response, { dispatch }) => {
        dispatch(setToken(response.access_token));
        dispatch(setRefreshToken(response.refresh_token));
      },
    }),

    refreshToken: builder.mutation({
      query: () => {
        const refreshToken = store.getState().auth.user.refresh_token;
        return {
          url: "refresh-token",
          method: "POST",
          body: { refreshToken },
        };
      },
      invalidatesTags: ["auth"],
      onSuccess: (response, { dispatch }) => {
        dispatch(setToken(response.token));
      },
      onError: async (error, { dispatch }) => {
        if (error.status === 403) {
          try {
            const refreshResult = await apiSlice.endpoints.refreshToken.query();
            if (refreshResult.data) {
              // Successfully refreshed token, dispatch actions accordingly
              dispatch(setToken(refreshResult.data.access_token));
            } else {
              // Failed to refresh token, clear token and refresh token
              dispatch(clearToken());
              dispatch(clearRefreshToken());
              dispatch(clearUser());
            }
          } catch (error) {
            // Failed to refresh token, clear token and refresh token
            dispatch(clearToken());
            dispatch(clearRefreshToken());
            dispatch(clearUser());
          }
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenMutation } = apiSlice;
