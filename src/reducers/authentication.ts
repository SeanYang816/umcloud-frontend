import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    isAuthenticated: false,
    token: null,
    user: null,
  },
  reducers: {
    authLogin: (state, { payload }) => {
      const { token, user } = payload

      state.isAuthenticated = true
      state.token = token
      state.user = user
    },
    authLogout: (state) => {
      state.token = null
      state.user = null
      state.isAuthenticated = false
    },
  },
})

export const { authLogin, authLogout } = authSlice.actions
export const authentication = authSlice.reducer
