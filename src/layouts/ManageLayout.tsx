import React, { FC, ReactNode } from 'react'
import styles from './ManageLayout.module.scss'

type propTypes = {
  children: ReactNode
}
const ManageLayout: FC<propTypes> = (props: propTypes) => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <p>ManageLayout left</p>
        <button>创建问卷</button>
        <br />
        <a>我的问卷</a>
        <br />
        <a>星标问卷</a>
        <br />
        <a>回收站</a>
        <br />
      </div>
      <div className={styles.right}>{props.children}</div>
    </div>
  )
}

export default ManageLayout
