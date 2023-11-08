import { useSelector } from 'react-redux'

import { StateType } from '@/store'
import { QEditorStateType } from '@/store/qEditorReducer'

// 获取 redux 中 QEditor State
const useGetQEditorInfo = () => {
  const { componentList, selectedId, copiedComponentInfo, pageInfo } = useSelector<StateType>(
    state => state.qEditor.present
  ) as QEditorStateType

  const selectedComponent = componentList.find(c => c.fe_id === selectedId)

  return { componentList, selectedId, selectedComponent, copiedComponentInfo, pageInfo }
}

export default useGetQEditorInfo
