import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { RootState } from '../../store'
import { REDUCERPATH } from './constant'

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_BASEPATH,
  timeout: 5000,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  },
})

export const api = createApi({
  reducerPath: REDUCERPATH,
  baseQuery: baseQuery,
  tagTypes: ['account', 'planet', 'resources', 'building', 'research'],
  endpoints: () => ({}),
})
