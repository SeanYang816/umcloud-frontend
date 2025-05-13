import { createSlice } from '@reduxjs/toolkit'
import { MessageStatusProps } from 'types'

export type ConfigStateProps = {
  apply: {
    isLoading: boolean
    setting: MessageStatusProps | null
    status: MessageStatusProps | null
  }
  dataChanges:
    | ({
        result: {
          changes: string | string[]
        }
      } & MessageStatusProps)
    | null
  revertStatus: MessageStatusProps | null
  refetchData: {
    shouldRefetchData: boolean
    dataRefresher: boolean
  }
}

const initialState: ConfigStateProps = {
  apply: {
    isLoading: false,
    setting: null,
    status: null,
  },
  dataChanges: null,
  revertStatus: null,
  refetchData: {
    shouldRefetchData: false,
    dataRefresher: false,
  },
}

export const slice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    clearConfigProperty: () => {
      return initialState
    },
    updateApplyLoading: (state, { payload }) => {
      state.apply.isLoading = payload
    },
    updateApplySetting: (state, { payload }) => {
      state.apply.setting = payload
    },
    updateApplyStatus: (state, { payload }) => {
      state.apply.status = payload
    },
    updateDataChanges: (state, { payload }) => {
      state.dataChanges = payload
    },
    updateRevertStatus: (state, { payload }) => {
      state.revertStatus = payload
    },
    updateShouldRefetchData: (state, { payload }) => {
      state.refetchData.shouldRefetchData = payload
    },
    updateDataRefresher: (state, { payload }) => {
      state.refetchData.dataRefresher = payload
    },
  },
})

export const {
  clearConfigProperty,
  updateApplySetting,
  updateDataChanges,
  updateApplyStatus,
  updateRevertStatus,
  updateApplyLoading,
  updateShouldRefetchData,
  updateDataRefresher,
} = slice.actions
export const config = slice.reducer
