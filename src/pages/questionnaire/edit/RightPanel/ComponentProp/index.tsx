import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import {
  QEditorComponentConfigType,
  QEditorComponentPropsType,
  getComponentConfigByType,
} from '../../../../../components/QEditorComponents'
import {
  ComponentInfoType,
  changeComponentInfoPropsAction,
} from '../../../../../store/qEditorReducer'
import useGetQEditorInfo from '../../../../../hooks/useGetQEditorInfo'

const NotSelected: FC = () => <div style={{ textAlign: 'center' }}>未选中组件</div>

const ComponentProp: FC = () => {
  const dispatch = useDispatch()
  const { selectedComponent } = useGetQEditorInfo()
  if (selectedComponent == null) return <NotSelected />

  const { type, props, fe_id, isLocked } = selectedComponent as ComponentInfoType
  const config = getComponentConfigByType(type)
  if (config == null) return <NotSelected />

  const { PropsComponent } = config as QEditorComponentConfigType

  const onChange = (newProps: QEditorComponentPropsType) => {
    dispatch(changeComponentInfoPropsAction({ fe_id, props: newProps }))
  }

  return <PropsComponent {...props} onChange={onChange} disabled={isLocked} />
}

export default ComponentProp
