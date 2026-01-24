import { baseApi } from "@/redux/baseApi";

export const awardsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addAwards: builder.mutation({
      query: (data) => ({
        url: "/awards/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["awards"],
    }),
    getAllAwards: builder.query({
      query: (query) => ({
        url: "/awards/all",
        method: "GET",
        params: query,
      }),
      providesTags: ["awards"],
    }),
    getAwardsCount: builder.query({
      query: () => ({
        url: "/awards/count",
        method: "GET",
      }),
      providesTags: ["awards"],
    }),
    getAwardsById: builder.query({
      query: (id) => ({
        url: `/awards/${id}`,
        method: "GET",
      }),
      providesTags: ["awards"],
    }),
    updateAwards: builder.mutation({
      query: ({ id, data }) => ({
        url: `/awards/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["awards"],
    }),
    deleteAwards: builder.mutation({
      query: (id) => ({
        url: `/awards/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["awards"],
    }),
  }),
});

export const {
  useAddAwardsMutation,
  useGetAllAwardsQuery,
  useGetAwardsByIdQuery,
  useUpdateAwardsMutation,
  useDeleteAwardsMutation,
  useGetAwardsCountQuery,
} = awardsApi;
