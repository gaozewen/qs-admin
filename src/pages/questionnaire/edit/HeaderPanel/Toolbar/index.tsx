import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  UnlockOutlined,
} from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import {
  changeComponentIsHiddenAction,
  deleteSelectedComponentAction,
  toggleComponentIsLockedAction,
} from '../../../../../store/qEditorReducer'
import useGetQEditorInfo from '../../../../../hooks/useGetQEditorInfo'

const Toolbar: FC = () => {
  const dispatch = useDispatch()
  const { selectedId, selectedComponent } = useGetQEditorInfo()
  const isDisabled = !selectedId
  const { isLocked } = selectedComponent || {}

  const onDelete = () => {
    dispatch(deleteSelectedComponentAction())
  }

  const onHidden = () => {
    dispatch(changeComponentIsHiddenAction({ fe_id: selectedId, isHidden: true }))
  }

  const onToggleIsLocked = () => {
    dispatch(toggleComponentIsLockedAction({ fe_id: selectedId }))
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} disabled={isDisabled} onClick={onDelete} />
      </Tooltip>

      <Tooltip title="隐藏">
        <Button
          shape="circle"
          icon={<EyeInvisibleOutlined />}
          disabled={isDisabled}
          onClick={onHidden}
        />
      </Tooltip>

      <Tooltip title={isLocked ? '解锁' : '锁定'}>
        <Button
          type={isLocked ? 'primary' : 'default'}
          shape="circle"
          icon={isLocked ? <UnlockOutlined /> : <LockOutlined />}
          disabled={isDisabled}
          onClick={onToggleIsLocked}
        />
      </Tooltip>
    </Space>
  )
}

export default Toolbar
