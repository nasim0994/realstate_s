import { baseApi } from "@/redux/baseApi";

export const projectTypeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProjectType: builder.mutation({
      query: (data) => ({
        url: "/project-type/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["projectType"],
    }),
    getAllProjectType: builder.query({
      query: (query) => ({
        url: "/project-type/all",
        method: "GET",
        params: query,
      }),
      providesTags: ["projectType"],
    }),
    getProjectTypeById: builder.query({
      query: (id) => ({
        url: `/project-type/${id}`,
        method: "GET",
      }),
      providesTags: ["projectType"],
    }),
    getProjectTypeBySlug: builder.query({
      query: (slug) => ({
        url: `/project-type/slug/${slug}`,
        method: "GET",
      }),
      providesTags: ["projectType"],
    }),
    updateProjectType: builder.mutation({
      query: ({ id, data }) => ({
        url: `/project-type/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["projectType"],
    }),
    deleteProjectType: builder.mutation({
      query: (id) => ({
        url: `/project-type/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["projectType"],
    }),
  }),
});

export const {
  useAddProjectTypeMutation,
  useGetAllProjectTypeQuery,
  useGetProjectTypeByIdQuery,
  useGetProjectTypeBySlugQuery,
  useUpdateProjectTypeMutation,
  useDeleteProjectTypeMutation,
} = projectTypeApi;
