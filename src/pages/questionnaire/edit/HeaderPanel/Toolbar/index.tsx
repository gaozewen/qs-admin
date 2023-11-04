import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  UpOutlined,
} from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import {
  changeComponentIsHiddenAction,
  deleteSelectedComponentAction,
  duplicateComponentAction,
  moveComponentAction,
  pasteCopiedComponentAction,
  toggleComponentIsLockedAction,
} from '../../../../../store/qEditorReducer'
import useGetQEditorInfo from '../../../../../hooks/useGetQEditorInfo'
import { getSelectedIndex, getVisibleComponentList } from '../../../../../store/utils'

const Toolbar: FC = () => {
  const dispatch = useDispatch()
  const { selectedId, selectedComponent, copiedComponentInfo, componentList } = useGetQEditorInfo()
  const isDisabled = !selectedId
  const { isLocked } = selectedComponent || {}
  const visibleList = getVisibleComponentList(componentList)
  const selectedIndex = getSelectedIndex(selectedId, visibleList)
  const len = visibleList.length
  const isFirst = selectedIndex === 0
  const isLast = selectedIndex === len - 1

  const onDelete = () => {
    dispatch(deleteSelectedComponentAction())
  }

  const onHidden = () => {
    dispatch(changeComponentIsHiddenAction({ fe_id: selectedId, isHidden: true }))
  }

  const onToggleIsLocked = () => {
    dispatch(toggleComponentIsLockedAction({ fe_id: selectedId }))
  }

  const onDuplicate = () => {
    dispatch(duplicateComponentAction())
  }

  const onPaste = () => {
    dispatch(pasteCopiedComponentAction())
  }

  const onMoveUp = () => {
    dispatch(
      moveComponentAction({
        oldIndex: selectedIndex,
        newIndex: selectedIndex - 1,
        isSortVisibleList: true,
      })
    )
  }

  const onMoveDown = () => {
    dispatch(
      moveComponentAction({
        oldIndex: selectedIndex,
        newIndex: selectedIndex + 1,
        isSortVisibleList: true,
      })
    )
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
          icon={<LockOutlined />}
          disabled={isDisabled}
          onClick={onToggleIsLocked}
        />
      </Tooltip>

      <Tooltip title="复制">
        <Button
          shape="circle"
          icon={<CopyOutlined />}
          disabled={isDisabled}
          onClick={onDuplicate}
        />
      </Tooltip>

      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          disabled={!copiedComponentInfo}
          onClick={onPaste}
        />
      </Tooltip>

      <Tooltip title="上移">
        <Button shape="circle" icon={<UpOutlined />} disabled={isFirst} onClick={onMoveUp} />
      </Tooltip>

      <Tooltip title="下移">
        <Button shape="circle" icon={<DownOutlined />} disabled={isLast} onClick={onMoveDown} />
      </Tooltip>
    </Space>
  )
}

export default Toolbar
