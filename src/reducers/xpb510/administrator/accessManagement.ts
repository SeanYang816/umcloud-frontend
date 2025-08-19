import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GetAccessManagementPageResponse } from 'types/xpb510/administrator/accessManagement'

export type AccessManagementState = GetAccessManagementPageResponse | null

const initialState: AccessManagementState = null

const slice = createSlice({
  name: 'accessManagement',
  initialState: initialState as AccessManagementState,
  reducers: {
    resetAccessManagement: () => initialState,
    getAccessManagement: (
      _state,
      { payload }: PayloadAction<GetAccessManagementPageResponse>,
    ) => payload,
    updateAccessManagement: (
      _state,
      { payload }: PayloadAction<GetAccessManagementPageResponse>,
    ) => payload,
  },
})

export const {
  resetAccessManagement,
  getAccessManagement,
  updateAccessManagement,
} = slice.actions

export const accessManagement = slice.reducer
