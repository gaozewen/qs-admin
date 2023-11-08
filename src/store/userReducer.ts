import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export type UserStateType = {
  username: string
  nickname: string
}

const INIT_STATE: UserStateType = { username: '', nickname: '' }

export const userSlice = createSlice({
  name: 'user',
  initialState: INIT_STATE,
  reducers: {
    loginAction: (state: UserStateType, action: PayloadAction<UserStateType>) => {
      // 设置 username 和 nickname 到 redux store
      return action.payload
    },
    // 退出就是清空用户数据
    logoutAction: () => INIT_STATE,
  },
})

export const { loginAction, logoutAction } = userSlice.actions

const userReducer = userSlice.reducer
export default userReducer
