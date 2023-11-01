export interface Questionnaire {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
  isDeleted: boolean // 假删除
}
