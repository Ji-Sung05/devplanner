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
        url: '/logout',
        method: "GET",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          // 서버의 로그아웃 요청이 성공하면 클라이언트에서 쿠키를 제거합니다.
          await queryFulfilled;
          removeCookie('token'); // 클라이언트 측의 토큰 쿠키 제거
          dispatch(userSlice.util.resetApiState()); // 상태 초기화
        } catch (err) {
          console.error("Logout failed:", err);
        }
      },
    }),
  })
})

export const { useGetAuthQuery, useLogoutMutation } = userSlice