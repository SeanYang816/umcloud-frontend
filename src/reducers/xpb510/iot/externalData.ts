import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  GetExternalDataResponse,
  GetExternalDataSourceResponse,
  SetSourceAliasResponse,
} from 'types/xpb510/iot/iot'

export type ExternalDataState = {
  source: GetExternalDataSourceResponse | null
  data: GetExternalDataResponse | null
}

const initialState: ExternalDataState = {
  source: null,
  data: null,
}

export const slice = createSlice({
  name: 'externalData',
  initialState,
  reducers: {
    resetIot: () => initialState,
    getExternalDataSource: (
      state,
      action: PayloadAction<GetExternalDataSourceResponse>,
    ) => {
      state.source = action.payload
    },
    updateExternalDataSourceAlias: (
      state,
      action: PayloadAction<SetSourceAliasResponse>,
    ) => {
      const { portNumber, alias } = action.payload

      // read safely; if source/sources missing, bail
      const target = state.source?.sources.find(
        (s) => s.portNumber === portNumber,
      )
      if (!target) return // not found or no sources

      // OK to mutate; this is a RTK draft
      target.alias = alias
    },
    getExternalData: (
      state,
      action: PayloadAction<GetExternalDataResponse>,
    ) => {
      state.data = action.payload
    },
  },
})

export const {
  resetIot,
  getExternalDataSource,
  getExternalData,
  updateExternalDataSourceAlias,
} = slice.actions
export const externalData = slice.reducer
