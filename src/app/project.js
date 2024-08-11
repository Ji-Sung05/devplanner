import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../cookies/Cookies";
console.log('123', getCookie('token'))
export const projectSlice = createApi({
  reducerPath: "project",
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
  tagTypes: ["Repo"],
  endpoints: builder => ({
    createProject: builder.mutation({
      query: ({id}) => ({
        url: process.env.REACT_APP_PROJECT,
        method: 'POST',
        body: {id}
      })
    }),
    addTask: builder.mutation({
      query: ({ projectId, task }) => ({
        url: `${process.env.REACT_APP_PROJECT}/${projectId}/tasks`,
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Repo'],
    }),
    updateTask: builder.mutation({
      query: ({ projectId, taskId, task }) => ({
        url: `${process.env.REACT_APP_PROJECT}/${projectId}/tasks/${taskId}`,
        method: 'PUT',
        body: task
      }),
      invalidatesTags: ['Repo'],
    }),
    fetchTasks: builder.query({
      query: (projectId) => `${process.env.REACT_APP_PROJECT}/${projectId}/tasks`,
      providesTags: ['Repo']
    }),
    fetchCommits: builder.query({
      query: ({ orgName, repoName }) => `${process.env.REACT_APP_COMMIT}/${orgName}/${repoName}`,
    }),
  })
})

export const { useCreateProjectMutation, useAddTaskMutation, useUpdateTaskMutation, useFetchTasksQuery, useFetchCommitsQuery } = projectSlice