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
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    verify: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/verify`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const {
  useCreateAccountMutation,
  useLogoutMutation,
  useLoginMutation,
  useVerifyMutation,
} = authApiSlice
