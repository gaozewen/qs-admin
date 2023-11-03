import React, { FC } from 'react'
import { Typography } from 'antd'
import QEditorInfoPropsComponent from './QEditorInfoPropsComponent'

const { Title, Paragraph } = Typography

export type QEditorInfoPropsType = {
  title?: string
  desc?: string
  onChange?: (newProps: QEditorInfoPropsType) => void
  disabled?: boolean
}

// 默认值
export const Q_EDITOR_INFO_DEFAULT_PROPS: QEditorInfoPropsType = {
  title: '问卷标题',
  desc: '问卷描述',
}

const QEditorInfo: FC<QEditorInfoPropsType> = (props: QEditorInfoPropsType) => {
  const { title = '', desc = '' } = { ...Q_EDITOR_INFO_DEFAULT_PROPS, ...props }
  const descTextList = desc.split('\n')
  return (
    <div style={{ textAlign: 'center' }}>
      <Title
        style={{
          fontSize: 24,
          margin: 0,
        }}
      >
        {title}
      </Title>
      <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>
        {descTextList.map((dt, index) => (
          <span key={index}>
            {index > 0 && <br />}
            {dt}
          </span>
        ))}
      </Paragraph>
    </div>
  )
}

export const QEditorInfoConfig = {
  title: '段落',
  type: 'info',
  Component: QEditorInfo,
  PropsComponent: QEditorInfoPropsComponent,
  defaultProps: Q_EDITOR_INFO_DEFAULT_PROPS,
}

export default QEditorInfo
