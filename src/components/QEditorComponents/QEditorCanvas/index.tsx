import React, { FC } from 'react'
import styles from './index.module.scss'
import useGetQEditorInfo from '../../../hooks/useGetQEditorInfo'
import { ComponentInfoType } from '../../../store/qEditorReducer'
import { getComponentConfigByType } from '..'

const genComponent = (componentInfo: ComponentInfoType) => {
  const { type, props } = componentInfo
  const config = getComponentConfigByType(type)
  if (config == null) return null
  const { Component } = config
  return <Component {...props} />
}

const QEditorCanvas: FC = () => {
  const { componentList } = useGetQEditorInfo()
  return (
    <div className={styles.canvas}>
      {componentList.map(componentInfo => {
        const { fe_id } = componentInfo
        return (
          <div key={fe_id} className={styles['cp-wrapper']}>
            <div className={styles.cp}>{genComponent(componentInfo)}</div>
          </div>
        )
      })}
    </div>
  )
}

export default QEditorCanvas
