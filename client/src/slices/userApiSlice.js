import { apiSlice } from './apiSlice'

const USER_URL = '/api/user'

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/update-user/${data.token}`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
})

export const { useUpdateUserMutation } = userApiSlice
