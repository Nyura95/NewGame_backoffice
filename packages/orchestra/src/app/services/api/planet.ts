import { api } from '.'
import { IBuilding, IPlanet, IResponseAPI, IResource, IBuildingConstruct } from './interface'
import { errorHandlerAccount } from './transform'

export const planetApi = api.injectEndpoints({
  endpoints: build => ({
    getPlanet: build.query<IResponseAPI<IPlanet>, {}>({
      query: () => ({
        url: 'api/v1/planet',
        method: 'GET',
      }),
      providesTags: () => [{ type: 'planet' }],
      transformErrorResponse: errorHandlerAccount,
    }),
    switchPlanet: build.mutation<IResponseAPI<string>, number>({
      query: id_planet => ({
        url: `api/v1/planet/switch/${id_planet}`,
        method: 'GET',
      }),
      transformErrorResponse: errorHandlerAccount,
    }),
    getResource: build.query<IResponseAPI<IResource[]>, {}>({
      query: () => ({
        url: 'api/v1/planet/resources',
        method: 'GET',
      }),
      providesTags: () => [{ type: 'resources' }],
      transformErrorResponse: errorHandlerAccount,
    }),
    getBuilding: build.query<IResponseAPI<IBuilding[]>, {}>({
      query: () => ({
        url: 'api/v1/planet/building',
        method: 'GET',
      }),
      providesTags: () => [{ type: 'building' }],
      transformErrorResponse: errorHandlerAccount,
    }),
    getConstructBuildingList: build.query<IResponseAPI<IBuildingConstruct | string>, {}>({
      query: () => ({
        url: `api/v1/planet/building/construct`,
        method: 'GET',
      }),
      transformErrorResponse: errorHandlerAccount,
    }),
    startConstructBuilding: build.mutation<IResponseAPI<string>, number>({
      query: id_planet_building => ({
        url: `api/v1/planet/building/construct/${id_planet_building}`,
        method: 'POST',
      }),
      transformErrorResponse: errorHandlerAccount,
    }),
    cancelConstructBuilding: build.mutation<IResponseAPI<string>, {}>({
      query: () => ({
        url: `api/v1/planet/building/construct`,
        method: 'DELETE',
      }),
      transformErrorResponse: errorHandlerAccount,
    }),
  }),
})

export const {
  useGetPlanetQuery,
  useSwitchPlanetMutation,
  useGetResourceQuery,
  useGetBuildingQuery,
  useGetConstructBuildingListQuery,
  useStartConstructBuildingMutation,
  useCancelConstructBuildingMutation,
} = planetApi

export const {
  endpoints: {
    getPlanet,
    switchPlanet,
    getResource,
    getBuilding,
    getConstructBuildingList,
    startConstructBuilding,
    cancelConstructBuilding,
  },
} = planetApi
