import { baseApi } from "@/redux/baseApi";

export const managementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addManagement: builder.mutation({
      query: (data) => ({
        url: "/management/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["management"],
    }),
    getAllManagement: builder.query({
      query: (query) => ({
        url: "/management/all",
        method: "GET",
        params: query,
      }),
      providesTags: ["management"],
    }),
    getManagementById: builder.query({
      query: (id) => ({
        url: `/management/${id}`,
        method: "GET",
      }),
      providesTags: ["management"],
    }),
    updateManagement: builder.mutation({
      query: ({ id, data }) => ({
        url: `/management/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["management"],
    }),
    deleteManagement: builder.mutation({
      query: (id) => ({
        url: `/management/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["management"],
    }),
  }),
});

export const {
  useAddManagementMutation,
  useGetAllManagementQuery,
  useGetManagementByIdQuery,
  useUpdateManagementMutation,
  useDeleteManagementMutation,
} = managementApi;
