import React, { FC, useState } from 'react'
// import QuestionCard from '../components/QuestionCard'
import styles from './List.module.scss'
import QuestionCard from '../components/QuestionCard'

const mockListData = Array(10)
  .fill('mock')
  .map((item, index) => ({
    _id: `q${index}`,
    title: `问卷${index}`,
    isPublished: [true, false][index % 2],
    isStar: false,
    answerCount: index % 5,
    createdAt: `10月2${index}日 1${index}:4${index}`,
  }))

const List: FC = () => {
  const [list] = useState(mockListData)

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {list.map(item => (
          <QuestionCard key={item._id} {...item} />
        ))}
      </div>
      <div className={styles.footer}>footer</div>
    </>
  )
}

export default List
