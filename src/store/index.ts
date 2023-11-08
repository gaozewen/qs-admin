import { configureStore } from '@reduxjs/toolkit'
import undoable, { excludeAction, StateWithHistory } from 'redux-undo'

import qEditorReducer, { QEditorStateType } from './qEditorReducer'
import userReducer, { UserStateType } from './userReducer'

export type StateType = {
  user: UserStateType
  qEditor: StateWithHistory<QEditorStateType>
}

export default configureStore({
  reducer: {
    // 分模块
    user: userReducer,
    qEditor: undoable(qEditorReducer, {
      limit: 20, // 限时 20 步
      // debug: true, // 【调试时使用】生产环境需要注释掉
      filter: excludeAction([
        'qEditor/resetQEditorAction',
        'qEditor/changeSelectedIdAction',
        'qEditor/duplicateComponentAction',
        'qEditor/selectPrevComponentAction',
        'qEditor/selectNextComponentAction',
      ]),
      // 只有为 true 的时候，在执行 filter Action 的时候才会将当前的 present 状态推入 past 栈
      syncFilter: true,
    }),
  },
})
