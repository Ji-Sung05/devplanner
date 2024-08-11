import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../cookies/Cookies";

export const todoSlice = createApi({
  reducerPath: "todo",
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
  tagTypes: ["Todo"],
  endpoints: builder => ({
    createTodo: builder.mutation({
      query: ({ todo, startDate, endDate }) => ({
        url: process.env.REACT_APP_TODO,
        method: 'POST',
        body: { todo, startDate, endDate }
      }),
      invalidatesTags: ["Todo"],
    }),
    fetchTodos: builder.query({
      query: () => process.env.REACT_APP_TODO,
      providesTags: ["Todo"]
    }),
    deleteTodo: builder.mutation({
      query: (todoId) => ({
        url: `${process.env.REACT_APP_TODO}/${todoId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Todo"]
    })
  })
})

export const {
  useCreateTodoMutation,
  useFetchTodosQuery,
  useDeleteTodoMutation,
} = todoSlice;