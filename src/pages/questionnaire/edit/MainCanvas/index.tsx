import React, { FC, MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import cs from 'classnames'
import styles from './index.module.scss'
import useGetQEditorInfo from '../../../../hooks/useGetQEditorInfo'
import { ComponentInfoType, changeSelectedIdAction } from '../../../../store/qEditorReducer'
import { getComponentConfigByType } from '../../../../components/QEditorComponents'
import { getVisibleComponentList } from '../../../../store/utils'

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
  // 是 React 中的 MouseEvent 类型
  const onSelect = (event: MouseEvent, fe_id: string) => {
    event.stopPropagation()
    dispatch(changeSelectedIdAction(fe_id))
  }
  return (
    <div className={styles.canvas}>
      {getVisibleComponentList(componentList).map(componentInfo => {
        const { fe_id } = componentInfo
        return (
          <div
            key={fe_id}
            className={cs({
              [styles['cp-wrapper']]: true,
              [styles.selected]: fe_id === selectedId,
            })}
            onClick={e => onSelect(e, fe_id)}
          >
            <div className={styles.cp}>{genComponent(componentInfo)}</div>
          </div>
        )
      })}
    </div>
  )
}

export default MainCanvas
