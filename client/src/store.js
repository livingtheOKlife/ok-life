import { configureStore } from '@reduxjs/toolkit'

import { apiSlice } from './slices/apiSlice'

const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})

export default store
