# API 设计

## 用户功能

### 获取用户信息

- method `get`
- path `/api/user/info`
- response `{ errno: 0, data: {...} }` 或 `{ errno: 10001, msg: 'xxx' }`

### 注册

- method `post`
- path `/api/user/register`
- request body `{ username, password, nickname }`
- response `{ errno: 0 }`

### 登录

- method `post`
- path `/api/user/login`
- request body `{ username, password }`
- response `{ errno: 0, data: { token } }` —— **JWT** 使用 token

## 问卷功能

### 创建问卷

- method `post`
- path `/api/questionnaire`
- request body - 无 （点击一个按钮即可创建，title 自动生成）
- response `{ errno: 0, data: { id } }`

### 获取单个问卷

- method `get`
- path `/api/questionnaire/:id`
- response `{ errno: 0, data: { id, title ... } }`

### 获取问卷列表

- method `get`
- path `/api/questionnaire`
- response: `{ errno: 0, data: { list: [ ... ], total } }`

### 更新问卷信息

- method `patch`
- path `/api/questionnaire/:id`
- request body `{ title, isStar ... }`
- response: `{ errno: 0 }`

PS：删除是`假删除`，实际是更新 `isDeleted` 属性

### 批量彻底删除问卷

- method `delete`
- path `/api/questionnaire`
- request body `{ ids: [ ... ] }`
- response: `{ errno: 0 }`

### 复制问卷

- method `post`
- path `/api/questionnaire/duplicate/:id`
- response: `{ errno: 0, data: { id } }`

## 小结

- 使用 Restful API
- 用户验证使用 JWT
- 统一返回格式 `{ errno, data, msg }`
