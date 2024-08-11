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
      query: () => process.env.REACT_APP_ORGS
    }),
    getRepos: builder.query({
      query: (orgName) => `${process.env.REACT_APP_REPO}/${orgName}`
    }),
    createRepo: builder.mutation({
      query: ({ orgName, repoName, description, visibility }) => ({
        url: process.env.REACT_APP_CREATE_REPO,
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
        url: `${process.env.REACT_APP_DELETE_REPO}/${org}/${repoName}`,
        method: 'DELETE',
      })
    }),
    cloneRepo: builder.mutation({
      query: ({ orgName, repoName}) => 
      ({
        url: `${process.env.REACT_APP_REPO}/${orgName}/${repoName}/clone-url`,
        method: 'GET'
      })
    })
  })
})

export const { useGetOrgsQuery, useGetReposQuery, useCreateRepoMutation, useDeleteRepoMutation, useCloneRepoMutation } = apiSlice