import { apiSlice } from './apiSlice'

const USERS_URL = '/api/auth'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAccount: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useCreateAccountMutation } = authApiSlice
