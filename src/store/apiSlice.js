import { createSlice } from '@reduxjs/toolkit'

export const apiSlice = createSlice({
  name: 'api',
  initialState: {
    generated: false,
    api_key: "",
    secret_key: ""
  },
  reducers: {
     isGenerated: (state, action) => {
      state.generated = action.payload
    },
    setApiKey: (state, action) => {
      state.api_key = action.payload
    },
    setSecretKey: (state, action) => {
      state.secret_key = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { isGenerated, setApiKey, setSecretKey } = apiSlice.actions

export default apiSlice.reducer