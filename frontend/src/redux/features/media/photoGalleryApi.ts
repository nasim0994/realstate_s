import { baseApi } from "@/redux/baseApi";

export const photoGalleryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addPhotoGallery: builder.mutation({
      query: (data) => ({
        url: "/photo-gallery/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["photoGallery"],
    }),
    getAllPhotoGallery: builder.query({
      query: (query) => ({
        url: "/photo-gallery/all",
        method: "GET",
        params: query,
      }),
      providesTags: ["photoGallery"],
    }),
    getPhotoGalleryById: builder.query({
      query: (id) => ({
        url: `/photo-gallery/${id}`,
        method: "GET",
      }),
      providesTags: ["photoGallery"],
    }),
    getPhotoGalleryBySlug: builder.query({
      query: (slug) => ({
        url: `/photo-gallery/slug/${slug}`,
        method: "GET",
      }),
      providesTags: ["photoGallery"],
    }),
    updatePhotoGallery: builder.mutation({
      query: ({ id, data }) => ({
        url: `/photo-gallery/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["photoGallery"],
    }),
    deletePhotoGallery: builder.mutation({
      query: (id) => ({
        url: `/photo-gallery/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["photoGallery"],
    }),
  }),
});

export const {
  useAddPhotoGalleryMutation,
  useGetAllPhotoGalleryQuery,
  useGetPhotoGalleryByIdQuery,
  useGetPhotoGalleryBySlugQuery,
  useUpdatePhotoGalleryMutation,
  useDeletePhotoGalleryMutation,
} = photoGalleryApi;
