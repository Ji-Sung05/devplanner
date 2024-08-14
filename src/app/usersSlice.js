import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie, removeCookie } from "../cookies/Cookies";
console.log('123', getCookie('token'))
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
        url: '/logout',
        method: 'POST', // 로그아웃 요청 방식
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // 로그아웃이 성공하면 쿠키 삭제 및 리디렉션
          removeCookie('token');
          window.location.href = '/login'; // 리디렉션
        } catch (error) {
          console.error('Logout failed:', error);
        }
      },
    }),
  })
})

export const { useGetAuthQuery, useLogoutMutation } = userSlice