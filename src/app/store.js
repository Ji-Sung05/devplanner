import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./usersSlice";
import { apiSlice } from "./apiSlice";
import { projectSlice } from "./project";
import { todoSlice } from "./todoSlice";

const store = configureStore({
  reducer: {
    [userSlice.reducerPath]: userSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [projectSlice.reducerPath]: projectSlice.reducer,
    [todoSlice.reducerPath]: todoSlice.reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(userSlice.middleware, apiSlice.middleware, projectSlice.middleware, todoSlice.middleware),
});

export default store;
