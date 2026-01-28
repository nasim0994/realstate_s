import { baseApi } from "@/redux/baseApi";

export const concernProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addConcernProduct: builder.mutation({
      query: (data) => ({
        url: "/concern-product/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["concernProduct"],
    }),
    getAllConcernProduct: builder.query({
      query: (query) => ({
        url: "/concern-product/all",
        method: "GET",
        params: query,
      }),
      providesTags: ["concernProduct"],
    }),
    getConcernProductCount: builder.query({
      query: () => ({
        url: "/concern-product/count",
        method: "GET",
      }),
      providesTags: ["concernProduct"],
    }),
    getConcernProductById: builder.query({
      query: (id) => ({
        url: `/concern-product/${id}`,
        method: "GET",
      }),
      providesTags: ["concernProduct"],
    }),
    updateConcernProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/concern-product/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["concernProduct"],
    }),
    deleteConcernProduct: builder.mutation({
      query: (id) => ({
        url: `/concern-product/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["concernProduct"],
    }),
  }),
});

export const {
  useAddConcernProductMutation,
  useGetAllConcernProductQuery,
  useGetConcernProductByIdQuery,
  useUpdateConcernProductMutation,
  useDeleteConcernProductMutation,
  useGetConcernProductCountQuery,
} = concernProductApi;
