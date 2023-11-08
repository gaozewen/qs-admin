import { Typography } from 'antd'
import React, { FC } from 'react'

import QEditorParagraphPropsComponent from './QEditorParagraphPropsComponent'

const { Paragraph } = Typography

export type QEditorParagraphPropsType = {
  text?: string
  isCenter?: boolean
  onChange?: (newProps: QEditorParagraphPropsType) => void
  disabled?: boolean
}

// 默认值
export const Q_EDITOR_PARAGRAPH_DEFAULT_PROPS: QEditorParagraphPropsType = {
  text: '一段段落',
  isCenter: false,
}

const QEditorParagraph: FC<QEditorParagraphPropsType> = (props: QEditorParagraphPropsType) => {
  const { text = '', isCenter = false } = { ...Q_EDITOR_PARAGRAPH_DEFAULT_PROPS, ...props }
  const textList = text.split('\n')
  return (
    <div>
      <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', margin: 0 }}>
        {textList.map((t, index) => (
          <span key={index}>
            {index > 0 && <br />}
            {t}
          </span>
        ))}
      </Paragraph>
    </div>
  )
}

export const QEditorParagraphConfig = {
  title: '段落',
  type: 'paragraph',
  Component: QEditorParagraph,
  PropsComponent: QEditorParagraphPropsComponent,
  defaultProps: Q_EDITOR_PARAGRAPH_DEFAULT_PROPS,
}

export default QEditorParagraph
