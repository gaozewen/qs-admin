import React, { FC, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import {
  QEditorComponentConfigGroup,
  QEditorComponentConfigType,
} from '../../../../../components/QEditorComponents'
import { Typography } from 'antd'
import styles from './index.module.scss'
import { addComponentAction } from '../../../../../store/qEditorReducer'
import { nanoid } from '@reduxjs/toolkit'

const { Title } = Typography

const genComponent = (config: QEditorComponentConfigType) => {
  const { type, title, Component, defaultProps } = config
  const dispatch = useDispatch()
  const onAddComponent = useCallback(() => {
    dispatch(
      addComponentAction({
        fe_id: nanoid(),
        type,
        title,
        props: defaultProps,
      })
    )
  }, [])
  return (
    <div key={type} className={styles['component-wrapper']} onClick={onAddComponent}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  )
}

const ComponentLib: FC = () => {
  return (
    <div className={styles.wrapper}>
      {QEditorComponentConfigGroup.map((group, index) => {
        const { groupId, groupName, configs } = group
        return (
          <div key={groupId}>
            <Title level={3} style={{ marginTop: index > 0 ? 20 : 0, fontSize: 16 }}>
              {groupName}
            </Title>
            <div>{configs.map(cfg => genComponent(cfg))}</div>
          </div>
        )
      })}
    </div>
  )
}

export default ComponentLib
