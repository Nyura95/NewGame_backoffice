import { api } from '.'
import { IAccount, IResponseAPI, IAccountPublic, IResearch, IResearchConstruct } from './interface'
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
    getResearch: build.query<IResponseAPI<IResearch[]>, {}>({
      query: () => ({
        url: 'api/v1/account/research',
        method: 'GET',
      }),
      providesTags: () => [{ type: 'research' }],
      transformErrorResponse: errorHandlerAccount,
    }),
    getConstructResearchList: build.mutation<IResponseAPI<IResearchConstruct>, {}>({
      query: () => ({
        url: `api/v1/account/research/construct`,
        method: 'GET',
      }),
      transformErrorResponse: errorHandlerAccount,
    }),
    startConstructResearch: build.mutation<IResponseAPI<string>, number>({
      query: id_account_research => ({
        url: `api/v1/account/research/construct/${id_account_research}`,
        method: 'GET',
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
  useGetConstructResearchListMutation,
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
