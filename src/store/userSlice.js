import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: "",
    email: "",
    username: "",
    phone: "",
  },
  reducers: {
     update: (state, action) => {
      state = action.payload
    },

  },
})

// Action creators are generated for each case reducer function
export const { update } = userSlice.actions

export default userSlice.reducer