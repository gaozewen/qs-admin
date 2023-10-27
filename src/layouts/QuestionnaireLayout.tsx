import React, { FC, ReactNode } from 'react'

type propTypes = {
  children: ReactNode
}
const QuestionnaireLayout: FC<propTypes> = (props: propTypes) => {
  return (
    <>
      <div>QuestionnaireLayout header</div>
      <div>{props.children}</div>
      <div>QuestionnaireLayout footer</div>
    </>
  )
}

export default QuestionnaireLayout
