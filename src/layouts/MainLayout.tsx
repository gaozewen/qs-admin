import React, { FC, ReactNode } from 'react'

type propTypes = {
  children: ReactNode
}
const MainLayout: FC<propTypes> = (props: propTypes) => {
  return (
    <>
      <div>MainLayout header</div>
      <div>{props.children}</div>
      <div>MainLayout footer</div>
    </>
  )
}

export default MainLayout
