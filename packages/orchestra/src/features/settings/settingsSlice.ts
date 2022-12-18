import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { REHYDRATE } from 'redux-persist'

import { TypeSidebar, TypeColor, TypeTheme } from '@cityscoot/components/src'

import { RootState } from '../../app/store'
import { SETTINGS } from '../const'
import { switchTheme } from './helpers'

const initialState = {
  sidebarMobileOpen: true,
  sidebarMini: false,
  sidebarType: TypeSidebar.dark,
  sidebarColor: TypeColor.info,
  navbarFixed: false,
  appTheme: TypeTheme.dark,
  operatorOpen: false,
  intervalRefetch: 30000,
}

export const settingsSlice = createSlice({
  name: SETTINGS,
  initialState,
  reducers: {
    updateSidebarMobile: (state, action: PayloadAction<boolean>) => {
      state.sidebarMobileOpen = action.payload
    },
    updateSidebarMini: (state, action: PayloadAction<boolean>) => {
      state.sidebarMini = action.payload
    },
    updateSidebarType: (state, action: PayloadAction<TypeSidebar>) => {
      state.sidebarType = action.payload
    },
    updateSidebarColor: (state, action: PayloadAction<TypeColor>) => {
      state.sidebarColor = action.payload
    },
    updateNavbarFixed: (state, action: PayloadAction<boolean>) => {
      state.navbarFixed = action.payload
    },
    updateAppTheme: (state, action: PayloadAction<TypeTheme>) => {
      switchTheme(action.payload)
      state.appTheme = action.payload
    },
    updateOperatorOpen: (state, action: PayloadAction<boolean>) => {
      state.operatorOpen = action.payload
    },
    updateIntervalRefetch: (state, action: PayloadAction<number>) => {
      state.intervalRefetch = action.payload * 1000
    },
  },
  extraReducers: builder => {
    builder.addCase(REHYDRATE, (state, action: unknown) => {
      if ((action as PayloadAction<RootState>).payload) {
        switchTheme((action as PayloadAction<RootState>).payload.settings.appTheme)
      }
    })
  },
})

export const {
  updateSidebarMobile,
  updateSidebarMini,
  updateSidebarType,
  updateSidebarColor,
  updateAppTheme,
  updateOperatorOpen,
  updateNavbarFixed,
  updateIntervalRefetch,
} = settingsSlice.actions

export const selectSettings = (state: RootState) => state.settings

export default settingsSlice.reducer
