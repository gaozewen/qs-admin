import { DeleteOutlined } from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { deleteSelectedComponentAction } from '../../../../../store/qEditorReducer'

const Toolbar: FC = () => {
  const dispatch = useDispatch()

  const onDelete = () => {
    dispatch(deleteSelectedComponentAction())
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={onDelete} />
      </Tooltip>
    </Space>
  )
}

export default Toolbar
