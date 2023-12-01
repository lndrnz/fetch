import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: false
  },
  reducers: {
    validate: state => {
      
      state.value = true
    },
    invalidate: state => {
      state.value = false
    },

  }
})

export const { validate, invalidate } = authSlice.actions

export default authSlice.reducer;