import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { QEditorStateType } from '../store/qEditorReducer'

// 获取 redux 中 QEditor State
const useGetQEditorInfo = () => {
  const { componentList, selectedId } = useSelector<StateType>(
    state => state.qEditor
  ) as QEditorStateType

  const selectedComponent = componentList.find(c => c.fe_id === selectedId)

  return { componentList, selectedId, selectedComponent }
}

export default useGetQEditorInfo
