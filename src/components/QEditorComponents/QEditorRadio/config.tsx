import QEditorRadio, { Q_EDITOR_RADIO_DEFAULT_PROPS } from '.'
import QEditorRadioPropsComponent from './QEditorRadioPropsComponent'
import QEditorRadioStatistic from './QEditorRadioStatistic'

// 不抽离出来 QEditorRadio 无法进行单元测试，会被 antV 干扰
export const QEditorRadioConfig = {
  title: '单选框',
  type: 'radio',
  Component: QEditorRadio,
  PropsComponent: QEditorRadioPropsComponent,
  defaultProps: Q_EDITOR_RADIO_DEFAULT_PROPS,
  StatisticComponent: QEditorRadioStatistic,
}
