import React, { FC, MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import cs from 'classnames'
import styles from './index.module.scss'
import useGetQEditorInfo from '../../../../hooks/useGetQEditorInfo'
import {
  ComponentInfoType,
  changeSelectedIdAction,
  moveComponentAction,
} from '../../../../store/qEditorReducer'
import { getComponentConfigByType } from '../../../../components/QEditorComponents'
import { getVisibleComponentList } from '../../../../store/utils'
import useBindCanvasKeyPress from '../../../../hooks/useBindCanvasKeyPress'
import SortableContainer from '../../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../../components/DragSortable/SortableItem'

const genComponent = (componentInfo: ComponentInfoType) => {
  const { type, props } = componentInfo
  const config = getComponentConfigByType(type)
  if (config == null) return null
  const { Component } = config
  return <Component {...props} />
}

const MainCanvas: FC = () => {
  const { componentList, selectedId } = useGetQEditorInfo()
  const dispatch = useDispatch()
  // 绑定键盘快捷键监听
  useBindCanvasKeyPress()

  // 是 React 中的 MouseEvent 类型
  const onSelect = (event: MouseEvent, fe_id: string) => {
    event.stopPropagation()
    dispatch(changeSelectedIdAction(fe_id))
  }

  const onDragEnd = (oldIndex: number, newIndex: number) => {
    dispatch(moveComponentAction({ oldIndex, newIndex, isSortVisibleList: true }))
  }

  const visibleList = getVisibleComponentList(componentList)

  return (
    <SortableContainer items={visibleList.map(c => ({ ...c, id: c.fe_id }))} onDragEnd={onDragEnd}>
      <div className={styles.canvas}>
        {visibleList.map(componentInfo => {
          const { fe_id, isLocked } = componentInfo
          return (
            <SortableItem key={fe_id} id={fe_id}>
              <div
                className={cs({
                  [styles['cp-wrapper']]: true,
                  [styles.selected]: fe_id === selectedId,
                  [styles.locked]: isLocked,
                })}
                onClick={e => onSelect(e, fe_id)}
              >
                <div className={styles.cp}>{genComponent(componentInfo)}</div>
              </div>
            </SortableItem>
          )
        })}
      </div>
    </SortableContainer>
  )
}

export default MainCanvas
