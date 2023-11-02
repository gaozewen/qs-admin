import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { QEditorComponentPropsType } from '../components/QEditorComponents'

// 后端返回的 QEditor 的组件数据
export type ComponentInfo = {
  fe_id: string
  type: string
  title: string
  props: QEditorComponentPropsType
}

export type QEditorStateType = {
  componentList: ComponentInfo[]
}

const INIT_STATE: QEditorStateType = { componentList: [] }

export const qEditorSlice = createSlice({
  name: 'qEditor',
  initialState: INIT_STATE,
  reducers: {
    // 重置 redux 中 QEditor 的 state
    resetQEditorAction: (state: QEditorStateType, action: PayloadAction<QEditorStateType>) => {
      return action.payload
    },
  },
})

export const { resetQEditorAction } = qEditorSlice.actions

const qEditorReducer = qEditorSlice.reducer
export default qEditorReducer
