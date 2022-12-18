import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { REDUCERPATH } from './constant'

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_BASEPATH,
  timeout: 5000,
})

export const api = createApi({
  reducerPath: REDUCERPATH,
  baseQuery: baseQuery,
  tagTypes: [],
  endpoints: () => ({}),
})
