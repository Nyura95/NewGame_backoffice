import { createSlice, isRejected } from '@reduxjs/toolkit'

import { authApi } from '../../app/services/api/auth'
import { IErrorHandler } from '../../app/services/interface'
import { RootState } from '../../app/store'
import { UNAUTHORIZED } from '../../enum'
import { AUTH } from '../const'

const initialState = {
  token: '',
  refreshToken: '',
}

export const authSlice = createSlice({
  name: AUTH,
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.token = action.payload.Data.Token
        state.refreshToken = action.payload.Data.RefreshToken
      })
      .addMatcher(authApi.endpoints.login.matchRejected, () => {
        return initialState
      })
    builder.addMatcher(isRejected, (state, action) => {
      if (action.payload) {
        const data = action.payload as unknown as IErrorHandler

        if (typeof data.status === 'number' && data.status === UNAUTHORIZED) {
          return initialState
        }
      }
    })
  },
})

export const { logout } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer
