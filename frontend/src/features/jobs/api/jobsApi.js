import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobsApiSlice = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/jobs" }),
  tagTypes: ["Jobs"],
  endpoints: (builder) => ({
    getAllJobs: builder.query({
      query: () => "all-jobs",
      providesTags: ["Jobs"],
    }),
    postNewJob: builder.mutation({
      query: (jobInfo) => ({
        url: "create-job",
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: jobInfo,
      }),
      invalidatesTags: ["Jobs"],
    }),
  }),
});

export const { useGetAllJobsQuery, usePostNewJobMutation } = jobsApiSlice;
