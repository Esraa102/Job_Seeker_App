import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const applicationsApi = createApi({
  reducerPath: "applicationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://job-seeker-app-nifs.onrender.com/api/application",
  }),
  tagTypes: ["Applications", "Jobs", "User"],
  endpoints: (builder) => ({
    applyJob: builder.mutation({
      query: (info) => ({
        url: `apply/${info.jobId}`,
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: info,
      }),
      invalidatesTags: ["Applications", "Jobs", "User"],
    }),
    getApplication: builder.mutation({
      query: (applicationId) => ({
        url: `get-application/${applicationId}`,
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Applications", "Jobs", "User"],
    }),
  }),
});

export const { useApplyJobMutation, useGetApplicationMutation } =
  applicationsApi;
