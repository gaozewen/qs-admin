import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { QEditorComponentPropsType } from '../components/QEditorComponents'
// import { produce } from 'immer'

// 后端返回的 QEditor 的组件数据
export type ComponentInfoType = {
  fe_id: string // 前端控制生成的不重复的 id
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
    changeComponentInfoPropsAction: (
      state: QEditorStateType,
      action: PayloadAction<{ fe_id: string; props: QEditorComponentPropsType }>
    ) => {
      const { fe_id, props } = action.payload
      const curComp = state.componentList.find(c => c.fe_id === fe_id)
      if (curComp) {
        curComp.props = props
      }
    },
    deleteSelectedComponentAction: (state: QEditorStateType) => {
      const { componentList, selectedId } = state
      const len = componentList.length
      const willDeleteIndex = componentList.findIndex(c => c.fe_id === selectedId)
      // 没找到选中的，则不做任何处理
      if (willDeleteIndex < 0) return
      // 删除后默认选中下一个组件
      let willSelectedIndex = willDeleteIndex + 1
      let willSelectedId = ''
      // 若删除的是末尾组件，则默认选择前一个组件
      if (willDeleteIndex + 1 === len) {
        willSelectedIndex = willDeleteIndex - 1
      }
      // 若删除的是不是最后一个组件，则赋值 selectedId
      if (len > 1) {
        willSelectedId = componentList[willSelectedIndex].fe_id
      }

      // 先修删除后即将选中的组件 id
      state.selectedId = willSelectedId

      // 再删除需要删除的组件
      componentList.splice(willDeleteIndex, 1)
    },
  },
})

export const {
  resetQEditorAction,
  changeSelectedIdAction,
  addComponentAction,
  changeComponentInfoPropsAction,
  deleteSelectedComponentAction,
} = qEditorSlice.actions

const qEditorReducer = qEditorSlice.reducer
export default qEditorReducer
