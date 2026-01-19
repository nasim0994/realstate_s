import { baseApi } from "@/redux/baseApi";

export const contactMessageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addMessage: builder.mutation({
      query: (data) => ({
        url: `/message/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["message"],
    }),
    getAllMessage: builder.query({
      query: (query) => ({
        url: "/message/all",
        method: "GET",
        params: query,
      }),
      providesTags: ["message"],
    }),

    getMessageById: builder.query({
      query: (id) => ({
        url: `/message/${id}`,
      }),
      providesTags: ["message"],
    }),

    updateMessage: builder.mutation({
      query: ({ data, id }) => ({
        url: `/message/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["message"],
    }),
    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `/message/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["message"],
    }),
  }),
});

export const {
  useAddMessageMutation,
  useGetAllMessageQuery,
  useGetMessageByIdQuery,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} = contactMessageApi;
