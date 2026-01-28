import { baseApi } from "@/redux/baseApi";

export const chairmanQuoteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addChairmanQuote: builder.mutation({
      query: (data) => ({
        url: "/chairman-quote/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["chairmanQuote"],
    }),
    getAllChairmanQuote: builder.query({
      query: (query) => ({
        url: "/chairman-quote/all",
        method: "GET",
        params: query,
      }),
      providesTags: ["chairmanQuote"],
    }),
    getChairmanQuoteById: builder.query({
      query: (id) => ({
        url: `/chairman-quote/${id}`,
        method: "GET",
      }),
      providesTags: ["chairmanQuote"],
    }),
    getChairmanQuoteBySlug: builder.query({
      query: (slug) => ({
        url: `/chairman-quote/slug/${slug}`,
        method: "GET",
      }),
      providesTags: ["chairmanQuote"],
    }),
    updateChairmanQuote: builder.mutation({
      query: ({ id, data }) => ({
        url: `/chairman-quote/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["chairmanQuote"],
    }),
    deleteChairmanQuote: builder.mutation({
      query: (id) => ({
        url: `/chairman-quote/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["chairmanQuote"],
    }),
  }),
});

export const {
  useAddChairmanQuoteMutation,
  useGetAllChairmanQuoteQuery,
  useGetChairmanQuoteByIdQuery,
  useGetChairmanQuoteBySlugQuery,
  useUpdateChairmanQuoteMutation,
  useDeleteChairmanQuoteMutation,
} = chairmanQuoteApi;
