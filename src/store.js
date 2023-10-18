import { configureStore } from '@reduxjs/toolkit'
import apiReducer from '../src/store/apiSlice'
import userReducer from '../src/store/userSlice'


export default configureStore({
  reducer: {
    apikey: apiReducer,
    userDetails: userReducer,
  },
})