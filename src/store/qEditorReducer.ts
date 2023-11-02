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
    addComponentAction: (state: QEditorStateType, action: PayloadAction<ComponentInfoType>) => {
      const { componentList, selectedId } = state
      const { payload: newComponentInfo } = action

      const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)
      if (selectedIndex < 0) {
        // 没有被选中的组件
        state.componentList.push(newComponentInfo)
      } else {
        // 有被选中的组件，将新组件插入到他之后
        state.componentList.splice(selectedIndex + 1, 0, newComponentInfo)
      }

      state.selectedId = newComponentInfo.fe_id
    },
  },
})

export const { resetQEditorAction, changeSelectedIdAction, addComponentAction } =
  qEditorSlice.actions

const qEditorReducer = qEditorSlice.reducer
export default qEditorReducer
