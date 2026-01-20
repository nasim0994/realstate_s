import { baseApi } from "@/redux/baseApi";

export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProject: builder.mutation({
      query: (data) => ({
        url: "/project/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["project"],
    }),
    getAllProject: builder.query({
      query: (query) => ({
        url: "/project/all",
        method: "GET",
        params: query,
      }),
      providesTags: ["project"],
    }),
    getProjectById: builder.query({
      query: (id) => ({
        url: `/project/${id}`,
        method: "GET",
      }),
      providesTags: ["project"],
    }),
    getProjectBySlug: builder.query({
      query: (slug) => ({
        url: `/project/slug/${slug}`,
        method: "GET",
      }),
      providesTags: ["project"],
    }),
    updateProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `/project/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["project"],
    }),
    toggleFeatureProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `/project/toggle/feature/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["project"],
    }),
    toggleStatusProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `/project/toggle/status/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["project"],
    }),
    toggleHighlightProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `/project/toggle/highlight/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["project"],
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/project/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["project"],
    }),
  }),
});

export const {
  useAddProjectMutation,
  useGetAllProjectQuery,
  useGetProjectByIdQuery,
  useGetProjectBySlugQuery,
  useUpdateProjectMutation,
  useToggleFeatureProjectMutation,
  useToggleStatusProjectMutation,
  useToggleHighlightProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
