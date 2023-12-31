import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice, nanoid } from '@reduxjs/toolkit'
import cloneDeep from 'lodash.clonedeep'

import { QEditorComponentPropsType } from '@/components/QEditorComponents'

import {
  getNextComponentSelectedId,
  getRealOldAndNewIndexOfComponentList,
  getSelectedComponentInfo,
  getSelectedIndex,
  getVisibleComponentList,
  insertNewComponentInfo,
  moveArray,
} from './utils'

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

export type PageInfoType = {
  title: string
  desc?: string
  js?: string
  css?: string
  isPublished?: boolean
}

export type QEditorStateType = {
  componentList: ComponentInfoType[]
  selectedId: string
  copiedComponentInfo: ComponentInfoType | null
  pageInfo: PageInfoType
}

const INIT_STATE: QEditorStateType = {
  componentList: [],
  selectedId: '',
  copiedComponentInfo: null,
  pageInfo: { title: '' },
}

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
      const { payload: newComponentInfo } = action
      insertNewComponentInfo(state, newComponentInfo)
    },
    changeComponentInfoPropsAction: (
      state: QEditorStateType,
      action: PayloadAction<{ fe_id: string; props: QEditorComponentPropsType }>
    ) => {
      const { fe_id, props } = action.payload
      const curComp = getSelectedComponentInfo(fe_id, state.componentList)
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
      const willChangeCompInfo = getSelectedComponentInfo(fe_id, componentList)
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
      const willChangeCompInfo = getSelectedComponentInfo(fe_id, state.componentList)
      if (willChangeCompInfo) {
        willChangeCompInfo.isLocked = !willChangeCompInfo.isLocked
      }
    },
    // 复制组件
    duplicateComponentAction: (state: QEditorStateType) => {
      const { selectedId } = state
      const compInfo = getSelectedComponentInfo(selectedId, state.componentList)
      if (compInfo) {
        // 需要使用深拷贝
        state.copiedComponentInfo = cloneDeep(compInfo)
      }
    },
    // 粘贴组件
    pasteCopiedComponentAction: (state: QEditorStateType) => {
      const { copiedComponentInfo } = state
      if (copiedComponentInfo == null) return
      // 修改 fe_id 确保其不重复
      copiedComponentInfo.fe_id = nanoid()
      // 将其插入组件列表
      insertNewComponentInfo(state, copiedComponentInfo)
    },
    // 选中上一个可见的组件
    selectPrevComponentAction: (state: QEditorStateType) => {
      const { selectedId, componentList } = state
      const visibleList = getVisibleComponentList(componentList)
      const selectedIndex = getSelectedIndex(selectedId, visibleList)
      // 未选中组件或选中的是第一个组件，则不做任何操作
      if (selectedIndex <= 0) return
      state.selectedId = state.componentList[selectedIndex - 1].fe_id
    },
    // 选中下一个可见的组件
    selectNextComponentAction: (state: QEditorStateType) => {
      const { selectedId, componentList } = state
      const visibleList = getVisibleComponentList(componentList)
      const selectedIndex = getSelectedIndex(selectedId, visibleList)
      // 未选中组件或选中的是最后一个组件，则不做任何操作
      if (selectedIndex < 0 || selectedIndex === visibleList.length - 1) return
      state.selectedId = state.componentList[selectedIndex + 1].fe_id
    },
    changeComponentTitleAction: (
      state: QEditorStateType,
      action: PayloadAction<{ fe_id: string; title: string }>
    ) => {
      const { fe_id, title } = action.payload
      const willChangeCompInfo = getSelectedComponentInfo(fe_id, state.componentList)
      if (willChangeCompInfo) {
        willChangeCompInfo.title = title
      }
    },
    // 重置页面设置信息
    resetPageInfoAction: (state: QEditorStateType, action: PayloadAction<PageInfoType>) => {
      state.pageInfo = action.payload
    },
    // 更新页面标题
    changePageTitleAction: (state: QEditorStateType, action: PayloadAction<string>) => {
      state.pageInfo.title = action.payload
    },
    // 移动组件
    moveComponentAction: (
      state: QEditorStateType,
      action: PayloadAction<{ oldIndex: number; newIndex: number; isSortVisibleList: boolean }>
    ) => {
      const { componentList } = state
      // isSortVisibleList 是否是对可见列表排序
      const { oldIndex, newIndex, isSortVisibleList } = action.payload
      const { realOldIndex, realNewIndex } = getRealOldAndNewIndexOfComponentList({
        componentList,
        oldIndex,
        newIndex,
        isSortVisibleList,
      })
      moveArray(componentList, realOldIndex, realNewIndex)
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
  duplicateComponentAction,
  pasteCopiedComponentAction,
  selectPrevComponentAction,
  selectNextComponentAction,
  changeComponentTitleAction,
  resetPageInfoAction,
  changePageTitleAction,
  moveComponentAction,
} = qEditorSlice.actions

const qEditorReducer = qEditorSlice.reducer
export default qEditorReducer
