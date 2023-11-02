import React, { FC } from 'react'
import {
  QEditorComponentConfigType,
  getComponentConfigByType,
} from '../../../../../components/QEditorComponents'
// import styles from './index.module.scss'
import { ComponentInfoType } from '../../../../../store/qEditorReducer'
import useGetQEditorInfo from '../../../../../hooks/useGetQEditorInfo'

const NotSelected: FC = () => <div style={{ textAlign: 'center' }}>未选中组件</div>

const ComponentProp: FC = () => {
  const { selectedComponent } = useGetQEditorInfo()
  if (selectedComponent == null) return <NotSelected />

  const { type, props } = selectedComponent as ComponentInfoType
  const config = getComponentConfigByType(type)
  if (config == null) return <NotSelected />

  const { PropsComponent } = config as QEditorComponentConfigType

  return <PropsComponent {...props} />
}

export default ComponentProp
