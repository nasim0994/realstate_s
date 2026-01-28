import { baseApi } from "@/redux/baseApi";

export const newsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addNews: builder.mutation({
      query: (data) => ({
        url: "/news/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["news"],
    }),
    getAllNews: builder.query({
      query: (query) => ({
        url: "/news/all",
        method: "GET",
        params: query,
      }),
      providesTags: ["news"],
    }),
    getNewsById: builder.query({
      query: (id) => ({
        url: `/news/${id}`,
        method: "GET",
      }),
      providesTags: ["news"],
    }),
    getNewsBySlug: builder.query({
      query: (slug) => ({
        url: `/news/slug/${slug}`,
        method: "GET",
      }),
      providesTags: ["news"],
    }),
    updateNews: builder.mutation({
      query: ({ id, data }) => ({
        url: `/news/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["news"],
    }),
    deleteNews: builder.mutation({
      query: (id) => ({
        url: `/news/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["news"],
    }),
  }),
});

export const {
  useAddNewsMutation,
  useGetAllNewsQuery,
  useGetNewsByIdQuery,
  useGetNewsBySlugQuery,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
} = newsApi;
