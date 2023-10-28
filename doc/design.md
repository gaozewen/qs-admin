# 页面对应路由

- 首页 `/`
- 登录 `/login`
- 注册 `/register`
- 问卷管理
    - 我的问卷 `/manage/list`
    - 标星问卷 `/manage/star`
    - 回收站 `/manage/trash`
- 问卷详情
    - 编辑问卷 `/questionnaire/edit/:id`
    - 问卷统计 `/questionnaire/statistic/:id`
- 404

# Layout 模板

- MainLayout
- ManageLayout
- QuestionnaireLayout

# 管理问卷三个页面

- 我的问卷：列表卡片 + LoadMore
- 星标问卷：列表卡片 + 分页
- 回收站：表格 + 分页