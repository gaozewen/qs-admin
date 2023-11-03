import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
  deleteSelectedComponentAction,
  duplicateComponentAction,
  pasteCopiedComponentAction,
  selectNextComponentAction,
  selectPrevComponentAction,
} from '../store/qEditorReducer'

// 是否激活的元素是有效的
const isActiveElementValid = () => {
  if (document.activeElement === document.body) return false
  // 激活了类似 input 等需要使用键盘输入的元素，则为有效
  return true
}

const useBindCanvasKeyPress = () => {
  const dispatch = useDispatch()

  // 删除
  useKeyPress(['backspace', 'delete'], () => {
    if (isActiveElementValid()) return
    dispatch(deleteSelectedComponentAction())
  })

  // 复制
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (isActiveElementValid()) return
    dispatch(duplicateComponentAction())
  })

  // 粘贴
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (isActiveElementValid()) return
    dispatch(pasteCopiedComponentAction())
  })

  // 选中上一个
  useKeyPress(['uparrow'], () => {
    if (isActiveElementValid()) return
    dispatch(selectPrevComponentAction())
  })

  // 选中下一个
  useKeyPress(['downarrow'], () => {
    if (isActiveElementValid()) return
    dispatch(selectNextComponentAction())
  })
}

export default useBindCanvasKeyPress
