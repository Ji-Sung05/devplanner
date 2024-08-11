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
    },
    credentials: 'include'
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
    }),
    deleteRepo: builder.mutation({
      query: ({ org, repoName }) => 
      ({
        url: `/delete-repo/${org}/${repoName}`,
        method: 'DELETE',
      })
    }),
    cloneRepo: builder.mutation({
      query: ({ orgName, repoName}) => 
      ({
        url: `/repo/${orgName}/${repoName}/clone-url`,
        method: 'GET'
      })
    })
  })
})

export const { useGetOrgsQuery, useGetReposQuery, useCreateRepoMutation, useDeleteRepoMutation, useCloneRepoMutation } = apiSlice