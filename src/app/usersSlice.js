import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../cookies/Cookies";
console.log(getCookie('token'))
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
    }
  }),
  endpoints: builder => ({
    getAuth: builder.query({
      query: () => "/user"
    }),
    getOrgs: builder.query({
      query: () => "/organizations"
    }),
    getRepos: builder.query({
      query: (orgName) => `/repos/${orgName}`
    })
  })
})

export const { useGetAuthQuery, useGetOrgsQuery, useGetReposQuery } = userSlice