import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobsApiSlice = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/jobs" }),
  tagTypes: ["User", "Jobs", "Appilcation", "Job"],
  endpoints: (builder) => ({
    getAllJobs: builder.mutation({
      query: () => ({
        method: "GET",
        url: "all-jobs",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["User", "Jobs", "Appilcation", "Job"],
    }),
    getJobById: builder.mutation({
      query: (jobId) => ({
        method: "GET",
        url: `job/${jobId}`,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["User", "Jobs", "Appilcation", "Job"],
    }),
    searchJob: builder.mutation({
      query: (searchQuery) => ({
        method: "GET",
        url: `search-job?${searchQuery}`,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["User", "Jobs", "Appilcation", "Job"],
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
      invalidatesTags: ["User", "Jobs", "Appilcation", "Job"],
    }),
    updateJob: builder.mutation({
      query: (info) => ({
        url: `update-job/${info.jobId}`,
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: info,
      }),
      invalidatesTags: ["User", "Jobs", "Appilcation", "Job"],
    }),
    getMyJobs: builder.mutation({
      query: () => ({
        url: "my-jobs",
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["User", "Jobs", "Appilcation", "Job"],
    }),
  }),
});

export const {
  useGetAllJobsMutation,
  useGetJobByIdMutation,
  useSearchJobMutation,
  usePostNewJobMutation,
  useUpdateJobMutation,
  useGetMyJobsMutation,
} = jobsApiSlice;
