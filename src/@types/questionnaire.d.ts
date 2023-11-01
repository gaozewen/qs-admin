export type Questionnaire = {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
  isDeleted: boolean // 假删除
}

export type UserStateType = {
  username: string
  nickname: string
}

export type StateType = {
  user: UserStateType
}
