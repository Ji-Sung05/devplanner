import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./usersSlice";
import { apiSlice } from "./apiSlice";
import { projectSlice } from "./project";

const store = configureStore({
  reducer: {
    [userSlice.reducerPath]: userSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [projectSlice.reducerPath]: projectSlice.reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(userSlice.middleware, apiSlice.middleware, projectSlice.middleware),
});

export default store;
