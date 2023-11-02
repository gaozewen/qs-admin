export interface Questionnaire {
  _id: string // 服务器 mongodb 生成的 id
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
  isDeleted: boolean // 假删除
}
