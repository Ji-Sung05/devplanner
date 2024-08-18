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
        method: "POST",
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          // 로그아웃 성공 시 쿠키에서 토큰을 삭제
          removeCookie('token');
          // 필요 시 클라이언트 상태 초기화
          window.location.href = '/login';
        } catch (error) {
          console.error('Logout failed:', error);
          // 실패해도 쿠키 삭제 및 상태 초기화
          removeCookie('token');
          window.location.href = '/login';
        }
      },
    }),
  })
})

export const { useGetAuthQuery, useLogoutMutation } = userSlice