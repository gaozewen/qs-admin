import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer'

export default configureStore({
  reducer: {
    // 分模块
    user: userReducer,
  },
})
