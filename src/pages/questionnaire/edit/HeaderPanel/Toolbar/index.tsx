import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  RedoOutlined,
  UndoOutlined,
  UpOutlined,
} from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActionCreators, StateWithHistory } from 'redux-undo'

import useGetQEditorInfo from '@/hooks/useGetQEditorInfo'
import { StateType } from '@/store'
import {
  changeComponentIsHiddenAction,
  deleteSelectedComponentAction,
  duplicateComponentAction,
  moveComponentAction,
  pasteCopiedComponentAction,
  QEditorStateType,
  toggleComponentIsLockedAction,
} from '@/store/qEditorReducer'
import { getSelectedIndex, getVisibleComponentList } from '@/store/utils'

const Toolbar: FC = () => {
  const dispatch = useDispatch()

  const qEditor = useSelector<StateType, StateWithHistory<QEditorStateType>>(state => state.qEditor)
  const pastLen = (qEditor.past || []).length
  const futureLen = (qEditor.future || []).length

  const { selectedId, selectedComponent, copiedComponentInfo, componentList } = useGetQEditorInfo()
  const isDisabled = !selectedId
  const { isLocked } = selectedComponent || {}
  const visibleList = getVisibleComponentList(componentList)
  const selectedIndex = getSelectedIndex(selectedId, visibleList)
  const len = visibleList.length
  const isFirst = selectedIndex === 0
  const isLast = selectedIndex === len - 1
  const visibleListIsEmpty = len === 0

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

  // 撤销
  const onUndo = () => {
    dispatch(ActionCreators.undo())
  }

  // 重做
  const onRedo = () => {
    dispatch(ActionCreators.redo())
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
        <Button
          shape="circle"
          icon={<UpOutlined />}
          disabled={isDisabled || isFirst || visibleListIsEmpty}
          onClick={onMoveUp}
        />
      </Tooltip>

      <Tooltip title="下移">
        <Button
          shape="circle"
          icon={<DownOutlined />}
          disabled={isDisabled || isLast || visibleListIsEmpty}
          onClick={onMoveDown}
        />
      </Tooltip>

      <Tooltip title="撤销">
        <Button shape="circle" icon={<UndoOutlined />} disabled={pastLen === 0} onClick={onUndo} />
      </Tooltip>

      <Tooltip title="重做">
        <Button
          shape="circle"
          icon={<RedoOutlined />}
          disabled={futureLen === 0}
          onClick={onRedo}
        />
      </Tooltip>
    </Space>
  )
}

export default Toolbar
