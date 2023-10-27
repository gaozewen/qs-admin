import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

const QuestionnaireLayout: FC = () => {
  return (
    <>
      <div>QuestionnaireLayout header</div>
      <div>
        <Outlet />
      </div>
      <div>QuestionnaireLayout footer</div>
    </>
  )
}

export default QuestionnaireLayout
