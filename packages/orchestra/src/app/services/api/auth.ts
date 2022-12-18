import { api } from '.'
import { IOauthResponse, IResponseAPI } from './interface'
import { errorHandlerAuth } from './transform'

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<IResponseAPI<IOauthResponse>, { email: string; password: string }>({
      query: credentials => ({
        url: 'api/v1/login',
        method: 'POST',
        body: credentials,
      }),
      transformErrorResponse: errorHandlerAuth,
    }),
    refresh: build.mutation<IResponseAPI<IOauthResponse>, { refreshToken: string }>({
      query: credentials => ({
        url: 'login/refresh',
        method: 'POST',
        body: credentials,
      }),
      transformErrorResponse: errorHandlerAuth,
    }),
  }),
})

export const { useLoginMutation, useRefreshMutation } = authApi

export const {
  endpoints: { login, refresh },
} = authApi
