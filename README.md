# Qs-Admin

基于 CreateReactApp + AntDesign5 + Typescript 的问卷后台管理系统 

## 使用

### `前置准备`

- 确保你已经在本地克隆并运行了 [Qs-Client](https://github.com/gaozewen/qs-client)  和 [Qs-Api](https://github.com/gaozewen/qs-api) 项目

- Node 环境 v18.x

### `安装 yarn`

~~~bash
npm install -g yarn
~~~

### `安装 CLI`

~~~bash
npm install -g dotenv-cli
~~~

### `安装依赖`

~~~bash
yarn install
~~~

### `启动项目`

~~~bash
yarn start:dev
~~~

应用访问：http://localhost:8000

## 可用的脚本

### `yarn start:dev`

使用 .env.dev 文件中的环境变量（开发环境），将项目启动到本地

### `yarn start:prod`

使用 .env.prod 文件中的环境变量（生产环境），将项目启动到本地

### `yarn build:dev`

使用 .env.dev 文件中的环境变量（开发环境），打包项目到 build 文件夹中

### `yarn build:prod`

使用 .env.prod 文件中的环境变量（生产环境），打包项目到 build 文件夹中
