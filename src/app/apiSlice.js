import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../cookies/Cookies";
export const apiSlice = createApi({
  reducerPath: "api",
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
    getOrgs: builder.query({
      query: () => "/organizations"
    }),
    getRepos: builder.query({
      query: (orgName) => `/repos/${orgName}`
    }),
    createRepo: builder.mutation({
      query: ({ orgName, repoName, description, visibility }) => ({
        url: `/create-repo`,
        method: 'POST',
        body: {
          orgName,
          repoName,
          description,
          visibility
        }
      })
    })
  })
})

export const { useGetOrgsQuery, useGetReposQuery, useCreateRepoMutation } = apiSlice