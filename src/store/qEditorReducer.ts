import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { QEditorComponentPropsType } from '../components/QEditorComponents'
import { getNextComponentSelectedId, getSelectedIndex, getVisibleComponentList } from './utils'
// import { produce } from 'immer'

// 后端返回的 QEditor 的组件数据
export type ComponentInfoType = {
  fe_id: string // 前端控制生成的不重复的 id
  type: string
  title: string
  props: QEditorComponentPropsType
  isHidden?: boolean
  isLocked?: boolean
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
      const willDeleteIndex = getSelectedIndex(selectedId, componentList)
      const visibleList = getVisibleComponentList(componentList)
      // 先修改删除后即将选中的组件 id
      state.selectedId = getNextComponentSelectedId(selectedId, visibleList)
      // 再做删除操作(先后顺序不能乱)
      state.componentList.splice(willDeleteIndex, 1)
    },
    // 隐藏/显示
    changeComponentIsHiddenAction: (
      state: QEditorStateType,
      action: PayloadAction<{ fe_id: string; isHidden: boolean }>
    ) => {
      const { componentList } = state
      const { fe_id, isHidden } = action.payload

      const visibleList = getVisibleComponentList(componentList)
      // 先修改隐藏/显示后即将选择的组件 id
      state.selectedId = isHidden ? getNextComponentSelectedId(fe_id, visibleList) : fe_id
      // 再做隐藏/显示操作(先后顺序不能乱)
      const willChangeCompInfo = componentList.find(c => c.fe_id === fe_id) as ComponentInfoType
      if (willChangeCompInfo) {
        willChangeCompInfo.isHidden = isHidden
      }
    },
    // 锁定、解锁
    toggleComponentIsLockedAction: (
      state: QEditorStateType,
      action: PayloadAction<{ fe_id: string }>
    ) => {
      const { fe_id } = action.payload
      const willChangeCompInfo = state.componentList.find(
        c => c.fe_id === fe_id
      ) as ComponentInfoType
      if (willChangeCompInfo) {
        const { isLocked } = willChangeCompInfo
        willChangeCompInfo.isLocked = !isLocked
      }
    },
  },
})

export const {
  resetQEditorAction,
  changeSelectedIdAction,
  addComponentAction,
  changeComponentInfoPropsAction,
  deleteSelectedComponentAction,
  changeComponentIsHiddenAction,
  toggleComponentIsLockedAction,
} = qEditorSlice.actions

const qEditorReducer = qEditorSlice.reducer
export default qEditorReducer
