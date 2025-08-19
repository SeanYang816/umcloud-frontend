import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GetAlgPageResponse } from 'types/xpb510/network/alg'

export type AlgPageState = GetAlgPageResponse | null

const initialState: AlgPageState = null

const slice = createSlice({
  name: 'alg',
  initialState: initialState as AlgPageState, // force correct type
  reducers: {
    resetAlg: () => initialState,
    getAlg: (state, { payload }: PayloadAction<GetAlgPageResponse>) => payload,
    updateAlg: (state, { payload }: PayloadAction<GetAlgPageResponse>) =>
      payload,
  },
})

export const { resetAlg, getAlg, updateAlg } = slice.actions
export const alg = slice.reducer
