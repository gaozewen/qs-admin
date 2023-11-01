import React, { FC } from 'react'
import styles from './index.module.scss'

const Edit: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>头部</div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}></div>
          <div className={styles.main}>
            <div className={styles['canvas-wrapper']}>
              <div className={styles.canvas}>画布</div>
            </div>
          </div>
          <div className={styles.right}></div>
        </div>
      </div>
    </div>
  )
}

export default Edit
