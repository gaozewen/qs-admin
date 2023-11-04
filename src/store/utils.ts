import { ComponentInfoType, QEditorStateType } from './qEditorReducer'

export const getVisibleComponentList = (componentList: ComponentInfoType[]) => {
  return componentList.filter(c => !c.isHidden)
}

export const getSelectedIndex = (selectedId: string, componentList: ComponentInfoType[]) => {
  return componentList.findIndex(c => c.fe_id === selectedId)
}

export const getSelectedComponentInfo = (
  selectedId: string,
  componentList: ComponentInfoType[]
) => {
  return componentList.find(c => c.fe_id === selectedId)
}

export const getNextComponentSelectedId = (
  currentSelectedId: string,
  visibleList: ComponentInfoType[]
) => {
  let willSelectedId = ''
  const len = visibleList.length
  const currentIndex = getSelectedIndex(currentSelectedId, visibleList)
  // 没找到选中的
  if (currentIndex < 0) return willSelectedId
  // 默认选中后一个组件
  let willSelectedIndex = currentIndex + 1

  // 若删除的是末尾组件，则默认选择前一个组件
  if (currentIndex + 1 === len) {
    willSelectedIndex = currentIndex - 1
  }
  // 若当前的是不是最后一个组件，则赋值 selectedId
  if (len > 1) {
    willSelectedId = visibleList[willSelectedIndex].fe_id
  }

  return willSelectedId
}

export const insertNewComponentInfo = (
  state: QEditorStateType,
  newComponentInfo: ComponentInfoType
) => {
  const { componentList, selectedId } = state

  const selectedIndex = getSelectedIndex(selectedId, componentList)
  if (selectedIndex < 0) {
    // 没有被选中的组件
    state.componentList.push(newComponentInfo)
  } else {
    // 有被选中的组件，将新组件插入到他之后
    state.componentList.splice(selectedIndex + 1, 0, newComponentInfo)
  }

  state.selectedId = newComponentInfo.fe_id
}

export const getRealOldAndNewIndexOfComponentList = (params: {
  componentList: ComponentInfoType[]
  oldIndex: number
  newIndex: number
  isSortVisibleList: boolean
}) => {
  const { componentList, oldIndex, newIndex, isSortVisibleList } = params || {}
  let realOldIndex = oldIndex
  let realNewIndex = newIndex
  if (isSortVisibleList) {
    const visibleList = getVisibleComponentList(componentList)
    // 可见列表中老位置的 ComponentInfo
    const oldPositionOriginalVisibleComp = visibleList.find((vc, index) => index === oldIndex)
    // 可见列表中新位置的原来的 ComponentInfo
    const newPositionOriginalVisibleComp = visibleList.find((vc, index) => index === newIndex)
    if (oldPositionOriginalVisibleComp?.fe_id && newPositionOriginalVisibleComp?.fe_id) {
      // 找到原始列表中的真正老位置
      realOldIndex = componentList.findIndex(c => c.fe_id === oldPositionOriginalVisibleComp?.fe_id)
      // 找到原始列表中的真正新位置
      realNewIndex = componentList.findIndex(c => c.fe_id === newPositionOriginalVisibleComp?.fe_id)
    }
  }
  return { realOldIndex, realNewIndex }
}

export const moveArray = (arr: any[], oldIndex: number, newIndex: number) => {
  //  oldIndex 是当前元素下标，newIndex 是拖动到的位置下标。

  // 将 item 上移
  if (oldIndex > newIndex) {
    // 先在新位置插入元素
    arr.splice(newIndex, 0, arr[oldIndex])
    // 再将老位置的元素删除
    arr.splice(oldIndex + 1, 1)
  } else {
    // 将 item 下移
    // 先在新位置插入元素
    arr.splice(newIndex + 1, 0, arr[oldIndex])
    // 再将老位置的元素删除
    arr.splice(oldIndex, 1)
  }
}
