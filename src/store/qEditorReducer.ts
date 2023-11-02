import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { QEditorComponentPropsType } from '../components/QEditorComponents'
// import { produce } from 'immer'

// 后端返回的 QEditor 的组件数据
export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  props: QEditorComponentPropsType
}

export type QEditorStateType = {
  componentList: ComponentInfoType[]
  selectedId: string
}

const INIT_STATE: QEditorStateType = { componentList: [], selectedId: '' }

export const qEditorSlice = createSlice({
  name: 'qEditor',
  initialState: INIT_STATE,
  reducers: {
    // 重置 redux 中 QEditor 的 state
    resetQEditorAction: (state: QEditorStateType, action: PayloadAction<QEditorStateType>) => {
      return action.payload
    },
    changeSelectedIdAction: (state: QEditorStateType, action: PayloadAction<string>) => {
      // Redux Toolkit 内部 自动使用 Immer，所以不需要额外引入，直接写即可 Immer 语法即可
      state.selectedId = action.payload
    },
  },
})

export const { resetQEditorAction, changeSelectedIdAction } = qEditorSlice.actions

const qEditorReducer = qEditorSlice.reducer
export default qEditorReducer
