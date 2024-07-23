import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./usersSlice";
import { apiSlice } from "./apiSlice";

const store = configureStore({
  reducer: {
    [userSlice.reducerPath]: userSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(userSlice.middleware, apiSlice.middleware),
});

export default store;
