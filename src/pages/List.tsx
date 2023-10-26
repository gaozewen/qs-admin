import React, { FC, useState } from 'react'
// import QuestionCard from '../components/QuestionCard'
// import styles from './List.module.scss'

const mockListData = Array(10)
  .fill('mock')
  .map((item, index) => ({
    id: `q${index}`,
    title: `问卷${index}`,
    isPublished: false,
    isStar: false,
    answerCount: index % 5,
    createAt: `10月2${index}日 1${index}:4${index}`,
  }))

const List: FC = () => {
  const [list] = useState(mockListData)

  return (
    <>
      <p>List</p>
      {list.map(item => (
        <div key={item.id}>{item.title}</div>
      ))}
    </>
  )
}

export default List
