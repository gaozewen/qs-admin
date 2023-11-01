import { useSelector } from 'react-redux'
import { StateType, UserStateType } from '../@types/questionnaire'

const useGetUserInfo = () => {
  const { username, nickname } = useSelector<StateType>(state => state.user) as UserStateType
  return { username, nickname }
}

export default useGetUserInfo
