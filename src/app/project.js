import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../cookies/Cookies";
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
    }
  }),
  endpoints: builder => ({
    createProject: builder.mutation({
      query: ({id}) => ({
        url: `/project`,
        method: 'POST',
        body: {id}
      })
    }),
    addTask: builder.mutation({
      query: ({ projectId, task }) => ({
        url: `/project/${projectId}/tasks`,
        method: 'PUT',
        body: task,
      }),
    }),
    fetchTasks: builder.query({
      query: (projectId) => `/project/${projectId}/tasks`
    })
  })
})

export const { useCreateProjectMutation, useAddTaskMutation, useFetchTasksQuery } = projectSlice