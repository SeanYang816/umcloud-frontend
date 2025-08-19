import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { resetXpbState } from 'actions/global'
import { GetRouteArpPageResponse } from 'types/xpb510/status/routes'

// Slice state: null initially, object when fetched
export type RoutesState = GetRouteArpPageResponse | null

const initialState: RoutesState = null

export const slice = createSlice({
  name: 'routes',
  initialState: initialState as RoutesState, // force correct type
  reducers: {
    resetRoutesState: () => initialState,
    getRoutes: (_state, action: PayloadAction<GetRouteArpPageResponse>) =>
      action.payload,
  },
  extraReducers: (builder) => {
    builder.addCase(resetXpbState, () => initialState)
  },
})

export const { resetRoutesState, getRoutes } = slice.actions
export const routes = slice.reducer
