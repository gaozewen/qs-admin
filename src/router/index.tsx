import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotFound from '../pages/NotFound'
import ManageLayout from '../layouts/ManageLayout'
import List from '../pages/manage/List'
import Star from '../pages/manage/Star'
import Trash from '../pages/manage/Trash'
import QuestionnaireLayout from '../layouts/QuestionnaireLayout'
import Edit from '../pages/questionnaire/edit'
import Statistic from '../pages/questionnaire/statistic'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'list',
            element: <List />,
          },
          {
            path: 'star',
            element: <Star />,
          },
          {
            path: 'trash',
            element: <Trash />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: 'questionnaire',
    element: <QuestionnaireLayout />,
    children: [
      {
        path: 'edit/:id',
        element: <Edit />,
      },
      {
        path: 'statistic/:id',
        element: <Statistic />,
      },
    ],
  },
])

export default router

// PN: pathname
export const PN_HOME = '/'
export const PN_LOGIN = '/login'
export const PN_REGISTER = '/register'
export const PN_MANAGE_INDEX = '/manage/list'
export const PN_MANAGE_STAR = '/manage/star'
export const PN_MANAGE_TRASH = '/manage/trash'
export const PN_QUESTIONNAIRE_EDIT = '/questionnaire/edit'
export const PN_QUESTIONNAIRE_STATISTIC = '/questionnaire/statistic'
