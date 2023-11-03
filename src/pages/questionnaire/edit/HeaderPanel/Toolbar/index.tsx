import { DeleteOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import {
  changeComponentIsHiddenAction,
  deleteSelectedComponentAction,
} from '../../../../../store/qEditorReducer'
import useGetQEditorInfo from '../../../../../hooks/useGetQEditorInfo'

const Toolbar: FC = () => {
  const dispatch = useDispatch()
  const { selectedId } = useGetQEditorInfo()
  const isDisabled = !selectedId

  const onDelete = () => {
    dispatch(deleteSelectedComponentAction())
  }

  const onHidden = () => {
    dispatch(changeComponentIsHiddenAction({ fe_id: selectedId, isHidden: true }))
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
    </Space>
  )
}

export default Toolbar
