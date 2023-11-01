export type QEditorTitlePropsType = {
  text?: string
  level?: 1 | 2 | 3 | 4 | 5
  isCenter?: boolean
}

// 默认值
export const Q_EDITOR_TITLE_DEFAULT_PROPS: QEditorTitlePropsType = {
  text: '一行标题',
  level: 1,
  isCenter: false,
}
