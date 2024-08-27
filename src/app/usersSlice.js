import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie, removeCookie } from "../cookies/Cookies";
export const userSlice = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getCookie('token');
      if(token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    getAuth: builder.query({
      query: () => "/user"
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "GET", 
        responseHandler: (response) => response.text(),
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          removeCookie('token');
          await queryFulfilled;
          dispatch(userSlice.util.resetApiState());
        } catch (err) {
          console.error("Logout failed:", err);
        }
      },
    }),
  })
})

export const { useGetAuthQuery, useLogoutMutation } = userSlice