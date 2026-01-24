import { baseApi } from "@/redux/baseApi";

export const moreAboutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addMoreAbout: builder.mutation({
      query: (data) => ({
        url: "/more-about/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["moreAbout"],
    }),
    getAllMoreAbout: builder.query({
      query: (query) => ({
        url: "/more-about/all",
        method: "GET",
        params: query,
      }),
      providesTags: ["moreAbout"],
    }),
    getMoreAboutCount: builder.query({
      query: () => ({
        url: "/more-about/count",
        method: "GET",
      }),
      providesTags: ["moreAbout"],
    }),
    getMoreAboutById: builder.query({
      query: (id) => ({
        url: `/more-about/${id}`,
        method: "GET",
      }),
      providesTags: ["moreAbout"],
    }),
    updateMoreAbout: builder.mutation({
      query: ({ id, data }) => ({
        url: `/more-about/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["moreAbout"],
    }),
    deleteMoreAbout: builder.mutation({
      query: (id) => ({
        url: `/more-about/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["moreAbout"],
    }),
  }),
});

export const {
  useAddMoreAboutMutation,
  useGetAllMoreAboutQuery,
  useGetMoreAboutByIdQuery,
  useUpdateMoreAboutMutation,
  useDeleteMoreAboutMutation,
  useGetMoreAboutCountQuery,
} = moreAboutApi;
