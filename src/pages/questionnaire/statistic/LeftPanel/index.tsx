import React, { FC } from 'react'
import cs from 'classnames'
import styles from './index.module.scss'
import useGetQEditorInfo from '../../../../hooks/useGetQEditorInfo'
import { ComponentInfoType } from '../../../../store/qEditorReducer'
import { getComponentConfigByType } from '../../../../components/QEditorComponents'
import { getVisibleComponentList } from '../../../../store/utils'

const genComponent = (componentInfo: ComponentInfoType) => {
  const { type, props } = componentInfo
  const config = getComponentConfigByType(type)
  if (config == null) return null
  const { Component } = config
  return <Component {...props} />
}

type PropsType = {
  selectedCompId: string
  setSelectedCompId: (id: string) => void
  setSelectedCompType: (type: string) => void
}

const LeftPanel: FC<PropsType> = props => {
  const { selectedCompId, setSelectedCompId, setSelectedCompType } = props
  const { componentList } = useGetQEditorInfo()

  const visibleList = getVisibleComponentList(componentList)

  return (
    <div className={styles['left-panel']}>
      {visibleList.map(componentInfo => {
        const { fe_id, isLocked, type } = componentInfo
        return (
          <div
            key={fe_id}
            className={cs({
              [styles['cp-wrapper']]: true,
              [styles.selected]: fe_id === selectedCompId,
              [styles.locked]: isLocked,
            })}
            onClick={() => {
              setSelectedCompId(fe_id)
              setSelectedCompType(type)
            }}
          >
            <div className={styles.cp}>{genComponent(componentInfo)}</div>
          </div>
        )
      })}
    </div>
  )
}

export default LeftPanel
