# 数据结构设计

## 广告位

- `name` 广告位名称，如：主轮播图
- `remark` 备注，如：首页住轮播图
- `height` 图片文件高度
- `width` 图片文件宽度

## 书籍

- `title` 书名
- `author` 作者，多个作者使用逗号隔开
- `popularity` 关注度
- `popularity` 关注度
- `cover` 封面图
- `price` 定价
- `press` 出版社
- `category` 类别
- `remark` 备注或推荐序
- `created_at` 创建日期
- `update_at` 更新日期
- `status` 状态，参考数据状态

## 书籍状态

- 0 草稿
- 1 已发布
- 2 标记为删除

## 科学家类别

- 数学家
- 天文学家
- 发明家
- 作家
- 政治家
- 医学家
- 药物学家
- 文学家
- 农业学家
- 物理学家
- 科学家
- 教育家

## 科学家

- `name` 姓名，
- `full_name` 全名
- `avatar` 头像
- `nationality` 国籍，默认以中文显示
- `date_birth` 出生日期
- `date_die` 逝世日期
- `occupation` 职业，多个职业使用逗号隔开
