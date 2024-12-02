import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../cookies/Cookies";

export const projectSlice = createApi({
  reducerPath: "project",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getCookie("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Repo"],
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: ({ id }) => ({
        url: `/project`,
        method: "POST",
        body: { id },
      }),
    }),
    addTask: builder.mutation({
      query: ({ projectId, task }) => ({
        url: `/project/${projectId}/tasks`,
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Repo"],
    }),
    updateTask: builder.mutation({
      query: ({ projectId, taskId, task }) => ({
        url: `/project/${projectId}/tasks/${taskId}`,
        method: "PUT",
        body: task,
      }),
      invalidatesTags: ["Repo"],
    }),
    fetchTasks: builder.query({
      query: (projectId) => `/project/${projectId}/tasks`,
      providesTags: ["Repo"],
      // 데이터 가공이 필요하다면 여기에서 작성
      transformResponse: (response) => ({
        tasks: response,
        todo: response.filter((task) => task.status === "To Do"),
        inprogress: response.filter((task) => task.status === "In Progress"),
        done: response.filter((task) => task.status === "Done"),
      }),
    }),
    deleteTasks: builder.mutation({
      query: ({ projectId, taskId }) => ({
        url: `/project/${projectId}/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Repo"],
    }),
    fetchCommits: builder.query({
      query: ({ orgName, repoName }) => `/commits/${orgName}/${repoName}`,
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useFetchTasksQuery,
  useFetchCommitsQuery,
  useDeleteTasksMutation,
} = projectSlice;
