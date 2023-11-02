import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './userReducer'
import qEditorReducer, { QEditorStateType } from './qEditorReducer'

export type StateType = {
  user: UserStateType
  qEditor: QEditorStateType
}

export default configureStore({
  reducer: {
    // 分模块
    user: userReducer,
    qEditor: qEditorReducer,
  },
})
