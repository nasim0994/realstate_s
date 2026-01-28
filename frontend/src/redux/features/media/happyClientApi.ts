import { baseApi } from "@/redux/baseApi";

export const happyClientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addHappyClient: builder.mutation({
      query: (data) => ({
        url: "/happy-client/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["happyClient"],
    }),
    getAllHappyClient: builder.query({
      query: (query) => ({
        url: "/happy-client/all",
        method: "GET",
        params: query,
      }),
      providesTags: ["happyClient"],
    }),
    getHappyClientById: builder.query({
      query: (id) => ({
        url: `/happy-client/${id}`,
        method: "GET",
      }),
      providesTags: ["happyClient"],
    }),
    getHappyClientBySlug: builder.query({
      query: (slug) => ({
        url: `/happy-client/slug/${slug}`,
        method: "GET",
      }),
      providesTags: ["happyClient"],
    }),
    updateHappyClient: builder.mutation({
      query: ({ id, data }) => ({
        url: `/happy-client/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["happyClient"],
    }),
    deleteHappyClient: builder.mutation({
      query: (id) => ({
        url: `/happy-client/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["happyClient"],
    }),
  }),
});

export const {
  useAddHappyClientMutation,
  useGetAllHappyClientQuery,
  useGetHappyClientByIdQuery,
  useGetHappyClientBySlugQuery,
  useUpdateHappyClientMutation,
  useDeleteHappyClientMutation,
} = happyClientApi;
