import { apiSlice } from './apiSlice'

const AUTH_URL = '/api/auth'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAccount: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: 'POST',
      }),
    }),
  }),
})

export const { useCreateAccountMutation, useLogoutMutation } = authApiSlice
