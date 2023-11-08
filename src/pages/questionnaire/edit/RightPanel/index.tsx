import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import { message, Tabs } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import useGetQEditorInfo from '@/hooks/useGetQEditorInfo'
import { changeSelectedIdAction } from '@/store/qEditorReducer'

import ComponentProp from './ComponentProp'
import PageSettings from './PageSettings'

enum TAB_KEYS {
  PROPS = 'props',
  SETTINGS = 'settings',
}

const RightPanel: FC = () => {
  const { selectedId } = useGetQEditorInfo()
  const [activeKey, setActiveKey] = useState(TAB_KEYS.SETTINGS)
  const dispatch = useDispatch()

  useEffect(() => {
    setActiveKey(selectedId ? TAB_KEYS.PROPS : TAB_KEYS.SETTINGS)
  }, [selectedId])

  const onChange = (key: string) => {
    if (activeKey === key) return
    if (key === TAB_KEYS.SETTINGS) {
      dispatch(changeSelectedIdAction(''))
    } else {
      // 选中 props tab
      if (!selectedId) message.warning('请选择中间画布中的组件来修改属性')
      else setActiveKey(TAB_KEYS.PROPS)
    }
  }

  const tabsItems = [
    {
      key: TAB_KEYS.PROPS,
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: TAB_KEYS.SETTINGS,
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <PageSettings />,
    },
  ]
  return <Tabs activeKey={activeKey} items={tabsItems} onChange={onChange} />
}

export default RightPanel
