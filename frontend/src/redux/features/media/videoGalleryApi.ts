import { baseApi } from "@/redux/baseApi";

export const videoGalleryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addVideoGallery: builder.mutation({
      query: (data) => ({
        url: "/video-gallery/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["videoGallery"],
    }),
    getAllVideoGallery: builder.query({
      query: (query) => ({
        url: "/video-gallery/all",
        method: "GET",
        params: query,
      }),
      providesTags: ["videoGallery"],
    }),
    getVideoGalleryById: builder.query({
      query: (id) => ({
        url: `/video-gallery/${id}`,
        method: "GET",
      }),
      providesTags: ["videoGallery"],
    }),
    getVideoGalleryBySlug: builder.query({
      query: (slug) => ({
        url: `/video-gallery/slug/${slug}`,
        method: "GET",
      }),
      providesTags: ["videoGallery"],
    }),
    updateVideoGallery: builder.mutation({
      query: ({ id, data }) => ({
        url: `/video-gallery/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["videoGallery"],
    }),
    deleteVideoGallery: builder.mutation({
      query: (id) => ({
        url: `/video-gallery/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["videoGallery"],
    }),
  }),
});

export const {
  useAddVideoGalleryMutation,
  useGetAllVideoGalleryQuery,
  useGetVideoGalleryByIdQuery,
  useGetVideoGalleryBySlugQuery,
  useUpdateVideoGalleryMutation,
  useDeleteVideoGalleryMutation,
} = videoGalleryApi;
