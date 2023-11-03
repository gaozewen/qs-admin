import { ComponentInfoType } from './qEditorReducer'

export const getVisibleComponentList = (componentList: ComponentInfoType[]) => {
  return componentList.filter(c => !c.isHidden)
}

export const getSelectedIndex = (selectedId: string, componentList: ComponentInfoType[]) => {
  return componentList.findIndex(c => c.fe_id === selectedId)
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
