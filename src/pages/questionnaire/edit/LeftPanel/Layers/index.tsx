import React, { ChangeEvent, FC, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import cs from 'classnames'
import { Button, Input, InputRef, Space, message } from 'antd'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import useGetQEditorInfo from '../../../../../hooks/useGetQEditorInfo'
import {
  ComponentInfoType,
  changeComponentIsHiddenAction,
  changeComponentTitleAction,
  changeSelectedIdAction,
  toggleComponentIsLockedAction,
} from '../../../../../store/qEditorReducer'
import styles from './index.module.scss'

const Layers: FC = () => {
  const { componentList, selectedId } = useGetQEditorInfo()
  const dispatch = useDispatch()
  const inputRef = useRef<InputRef>(null)

  // 记录当前正在修改标题的组件
  const [changingTitleId, setChangingTitleId] = useState('')

  const onClickTitleHandler = (fe_id: string) => {
    const curComp = componentList.find(c => c.fe_id === fe_id)
    if (curComp && curComp.isHidden) {
      message.warning('不能选中隐藏的组件')
      return
    }
    if (fe_id !== selectedId) {
      // 当前组件未被选中，先执行选中
      dispatch(changeSelectedIdAction(fe_id))
      setChangingTitleId('')
      return
    }

    // 已选中状态下再点击，则展示修改标题 Input
    setChangingTitleId(fe_id)

    // 选中之后光标聚焦到 input
    const timer = setTimeout(() => {
      if (inputRef.current) inputRef.current.focus()
      clearTimeout(timer)
    }, 0)
  }

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value.trim()
    if (!newTitle) return
    if (!selectedId) return
    dispatch(changeComponentTitleAction({ fe_id: selectedId, title: newTitle }))
  }

  const onToggleIsHidden = (fe_id: string, isHidden: boolean) => {
    dispatch(changeComponentIsHiddenAction({ fe_id, isHidden }))
  }

  const onToggleIsLocked = (fe_id: string) => {
    dispatch(toggleComponentIsLockedAction({ fe_id }))
  }

  return (
    <>
      {componentList?.map((compInfo: ComponentInfoType) => {
        const { fe_id, title, isHidden, isLocked } = compInfo
        const isShowInput = fe_id === changingTitleId
        return (
          <div key={fe_id} className={styles.wrapper}>
            <div
              onClick={() => onClickTitleHandler(fe_id)}
              className={cs({
                [styles.title]: true,
                [styles['is-hidden']]: isHidden,
                [styles.selected]: fe_id === selectedId,
              })}
            >
              {isShowInput ? (
                <Input
                  ref={inputRef}
                  value={title}
                  placeholder="请输入标题..."
                  onChange={onChangeTitle}
                  onPressEnter={() => setChangingTitleId('')}
                  onBlur={() => setChangingTitleId('')}
                />
              ) : (
                title
              )}
            </div>

            <Space className={styles.btns}>
              <Button
                size="small"
                shape="circle"
                className={cs({ [styles.btn]: !isHidden })}
                type={isHidden ? 'primary' : 'default'}
                icon={<EyeInvisibleOutlined />}
                onClick={() => onToggleIsHidden(fe_id, !isHidden)}
              />
              <Button
                size="small"
                shape="circle"
                className={cs({ [styles.btn]: !isLocked })}
                type={isLocked ? 'primary' : 'default'}
                icon={<LockOutlined />}
                onClick={() => onToggleIsLocked(fe_id)}
              />
            </Space>
          </div>
        )
      })}
    </>
  )
}

export default Layers
