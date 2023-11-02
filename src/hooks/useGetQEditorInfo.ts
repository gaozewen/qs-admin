import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { QEditorStateType } from '../store/qEditorReducer'

// 获取 redux 中 QEditor State
const useGetQEditorInfo = () => {
  const { componentList } = useSelector<StateType>(state => state.qEditor) as QEditorStateType
  return { componentList }
}

export default useGetQEditorInfo
