import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobsApiSlice = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/jobs" }),
  tagTypes: ["Jobs"],
  endpoints: (builder) => ({
    getAllJobs: builder.query({
      query: () => ({
        method: "GET",
        url: "all-jobs",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Jobs"],
    }),
    getJobById: builder.query({
      query: (jobId) => ({
        method: "GET",
        url: `job/${jobId}`,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Jobs"],
    }),
    searchJob: builder.mutation({
      query: (searchQuery) => ({
        method: "GET",
        url: `search-job?${searchQuery}`,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Jobs"],
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

export const {
  useGetAllJobsQuery,
  useGetJobByIdQuery,
  useSearchJobMutation,
  usePostNewJobMutation,
} = jobsApiSlice;
