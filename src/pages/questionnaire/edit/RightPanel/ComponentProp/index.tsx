import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import {
  QEditorComponentConfigType,
  QEditorComponentPropsType,
  getComponentConfigByType,
} from '../../../../../components/QEditorComponents'
// import styles from './index.module.scss'
import {
  ComponentInfoType,
  changeComponentInfoPropsAction,
} from '../../../../../store/qEditorReducer'
import useGetQEditorInfo from '../../../../../hooks/useGetQEditorInfo'

const NotSelected: FC = () => <div style={{ textAlign: 'center' }}>未选中组件</div>

const ComponentProp: FC = () => {
  const { selectedComponent } = useGetQEditorInfo()
  if (selectedComponent == null) return <NotSelected />

  const { type, props, fe_id } = selectedComponent as ComponentInfoType
  const config = getComponentConfigByType(type)
  if (config == null) return <NotSelected />

  const { PropsComponent } = config as QEditorComponentConfigType

  const dispatch = useDispatch()
  const onChange = (newProps: QEditorComponentPropsType) => {
    dispatch(changeComponentInfoPropsAction({ fe_id, props: newProps }))
  }

  return <PropsComponent {...props} onChange={onChange} />
}

export default ComponentProp
