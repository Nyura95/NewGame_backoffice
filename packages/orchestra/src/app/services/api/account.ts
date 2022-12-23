import { api } from '.'
import {
  IAccount,
  IResponseAPI,
  IAccountPublic,
  IAccountResearch,
  IResearchConstruct,
} from './interface'
import { errorHandlerAccount } from './transform'

export const accountApi = api.injectEndpoints({
  endpoints: build => ({
    getAccount: build.mutation<IResponseAPI<IAccount>, {}>({
      query: () => ({
        url: 'api/v1/account',
        method: 'GET',
      }),
      transformErrorResponse: errorHandlerAccount,
    }),
    getAnotherAccount: build.mutation<IResponseAPI<IAccountPublic>, number>({
      query: id_account => ({
        url: `api/v1/account/info/${id_account}`,
        method: 'GET',
      }),
      transformErrorResponse: errorHandlerAccount,
    }),
    getResearch: build.query<IResponseAPI<IAccountResearch[]>, {}>({
      query: () => ({
        url: 'api/v1/account/research',
        method: 'GET',
      }),
      providesTags: () => [{ type: 'research' }],
      transformErrorResponse: errorHandlerAccount,
    }),
    getConstructResearchList: build.query<IResponseAPI<IResearchConstruct | string>, {}>({
      query: () => ({
        url: `api/v1/account/research/construct`,
        method: 'GET',
      }),
      transformErrorResponse: errorHandlerAccount,
    }),
    startConstructResearch: build.mutation<IResponseAPI<string>, number>({
      query: id_account_research => ({
        url: `api/v1/account/research/construct/${id_account_research}`,
        method: 'POST',
      }),
      transformErrorResponse: errorHandlerAccount,
    }),
    cancelConstructResearch: build.mutation<IResponseAPI<string>, {}>({
      query: () => ({
        url: `api/v1/account/research/construct`,
        method: 'DELETE',
      }),
      transformErrorResponse: errorHandlerAccount,
    }),
  }),
})

export const {
  useGetAccountMutation,
  useGetAnotherAccountMutation,
  useGetResearchQuery,
  useGetConstructResearchListQuery,
  useStartConstructResearchMutation,
  useCancelConstructResearchMutation,
} = accountApi

export const {
  endpoints: {
    getAccount,
    getAnotherAccount,
    getResearch,
    getConstructResearchList,
    startConstructResearch,
    cancelConstructResearch,
  },
} = accountApi
