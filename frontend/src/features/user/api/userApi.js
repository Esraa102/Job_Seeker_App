import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/user" }),
  tagTypes: ["User", "Job", "Appilcation"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userInfo) => ({
        url: "register",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: userInfo,
      }),
    }),
    logInUser: builder.mutation({
      query: (userInfo) => ({
        url: "login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: userInfo,
      }),
    }),
    logOutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET",
        credentials: "include",
      }),
    }),
    getUserById: builder.query({
      query: (userId) => ({
        url: `get-user/${userId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
      providesTags: ["User", "Job", "Appilcation"],
    }),
    saveJob: builder.mutation({
      query: (jobId) => ({
        url: `save-unsave/${jobId}`,
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["User", "Job"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLogInUserMutation,
  useLogOutUserMutation,
  useGetUserByIdQuery,
  useSaveJobMutation,
} = userApiSlice;
