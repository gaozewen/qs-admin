import React, { FC } from 'react'
import styles from './index.module.scss'
import QEditorTitle from '../QEditorTitle'
import QEditorInput from '../QEditorInput'

const QEditorCanvas: FC = () => {
  return (
    <div className={styles.canvas}>
      <div className={styles['cp-wrapper']}>
        <div className={styles.cp}>
          <QEditorTitle />
        </div>
      </div>
      <div className={styles['cp-wrapper']}>
        <div className={styles.cp}>
          <QEditorInput />
        </div>
      </div>
    </div>
  )
}

export default QEditorCanvas
