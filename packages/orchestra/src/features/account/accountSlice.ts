import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IAccount, IPlanet } from '../../app/services/api/interface'
import { RootState } from '../../app/store'
import { ACCOUNT } from '../const'

interface IState {
  email: string
  id: number
  id_planet_focus: number
  planets: IPlanet[]
}

const initialState: IState = {
  id: 0,
  email: '',
  id_planet_focus: 0,
  planets: [],
}

export const accountSlice = createSlice({
  name: ACCOUNT,
  initialState,
  reducers: {
    reset: () => initialState,
    setAccount: (state, action: PayloadAction<IAccount>) => {
      state.id = action.payload.ID
      state.email = action.payload.Email
      state.id_planet_focus = action.payload.IDPlanetFocus
      state.planets = action.payload.Planets
    },
    switchPlanetFocus: (state, action: PayloadAction<number>) => {
      state.id_planet_focus = action.payload
    },
  },
})

export const { setAccount, switchPlanetFocus, reset } = accountSlice.actions

export const selectAccount = (state: RootState) => state.account

export default accountSlice.reducer
