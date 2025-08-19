import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { resetXpbState } from 'actions/global'
import { GetOverviewPageResponse } from 'types/xpb510/status/overview'

// Slice state: null initially, object when fetched
type OverviewState = GetOverviewPageResponse | null

const initialState: OverviewState = null

export const slice = createSlice({
  name: 'overview',
  initialState: initialState as OverviewState, // force correct type
  reducers: {
    resetOverviewState: () => initialState,
    getOverview: (_state, action: PayloadAction<GetOverviewPageResponse>) =>
      action.payload,
  },
  extraReducers: (builder) => {
    builder.addCase(resetXpbState, () => initialState)
  },
})

export const { resetOverviewState, getOverview } = slice.actions
export const overview = slice.reducer
