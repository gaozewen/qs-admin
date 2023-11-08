import QEditorCheckbox, { Q_EDITOR_CHECKBOX_DEFAULT_PROPS } from '.'
import QEditorCheckboxPropsComponent from './QEditorCheckboxPropsComponent'
import QEditorCheckboxStatistic from './QEditorCheckboxStatistic'

export const QEditorCheckboxConfig = {
  title: '多选框',
  type: 'checkbox',
  Component: QEditorCheckbox,
  PropsComponent: QEditorCheckboxPropsComponent,
  defaultProps: Q_EDITOR_CHECKBOX_DEFAULT_PROPS,
  StatisticComponent: QEditorCheckboxStatistic,
}
