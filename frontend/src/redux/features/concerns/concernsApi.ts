import { baseApi } from "@/redux/baseApi";

export const concernsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addConcerns: builder.mutation({
      query: (data) => ({
        url: "/concerns/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["concerns"],
    }),
    getAllConcerns: builder.query({
      query: (query) => ({
        url: "/concerns/all",
        method: "GET",
        params: query,
      }),
      providesTags: ["concerns"],
    }),
    getConcernsCount: builder.query({
      query: () => ({
        url: "/concerns/count",
        method: "GET",
      }),
      providesTags: ["concerns"],
    }),
    getConcernsById: builder.query({
      query: (id) => ({
        url: `/concerns/${id}`,
        method: "GET",
      }),
      providesTags: ["concerns"],
    }),
    updateConcerns: builder.mutation({
      query: ({ id, data }) => ({
        url: `/concerns/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["concerns"],
    }),
    deleteConcerns: builder.mutation({
      query: (id) => ({
        url: `/concerns/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["concerns"],
    }),
  }),
});

export const {
  useAddConcernsMutation,
  useGetAllConcernsQuery,
  useGetConcernsByIdQuery,
  useUpdateConcernsMutation,
  useDeleteConcernsMutation,
  useGetConcernsCountQuery,
} = concernsApi;
