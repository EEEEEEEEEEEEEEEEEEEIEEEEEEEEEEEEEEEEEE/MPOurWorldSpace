# 小程序

> 重新接触小程序开发，深入学习和研究小程序的表现力。

## 关于小程序

微信小程序是一种全新的连接用户与服务的方式，它可以在微信内被便捷地获取和传播，同时具有出色的使用体验。

## 目标

- 熟悉小程序的常见工程结构，梳理出合适的工程规范；
- 熟悉小程序常用资源和单位的使用，保证高品质还原设计效果；
- 熟悉小程序开发语法和风格；
- 熟悉系统 API 的应用和处理；
- 熟悉外部接口的访问和管理；
- 敏捷开发和经验积累；

## 页面清单

- [x] 首页（组件 tabHome）
- [ ] 探索（组件 tabExplore）
- [ ] user            我（组件 tabUser）
- [x] search          搜索
- [ ] special         专题
- [ ] specialDetail   专题详情
- [x] scientist       科学家
- [x] scientistDetail 科学家详情
- [ ] media           多媒体
- [ ] mediaDetail     多媒体详情
- [x] books           书籍
- [x] booksDetail     书籍详情
- [ ] collect         收藏管理
- [ ] history         我的足迹
- [ ] userProfile     个人资料
- [x] about           关于
- [ ] authLogin       获取微信用户信息

## 组件清单

- [x] carouselBaseItem 主轮播图
- [x] complete 操作完成
- [x] icon 图标
- [x] iconGroup 图标组
- [x] rate 评分星级
- [x] searchHandler 搜索条
- [ ] segment 分栏选项切换
- [ ] scrollNav 滚动导航
- [x] tabbar 底部选项导航
- [x] tabbarItem 底部选项导航条目
- [x] pageHeader 页面标题头
- [x] bookList 常规书籍列表
- [x] bookItem 常规书籍列表条目
- [ ] bookDetail 书籍展示详情
- [x] bookTopicList 置顶书籍列表
- [x] bookTopicItem 置顶书籍列表条目
- [x] entryItem 首页快捷入口条目
- [x] mediaList 多媒体列表
- [x] mediaItem 多媒体列表条目
- [x] scientistItem 科学家条目
- [x] section 页面栏目分块
- [x] specialItem 专栏条目
- [x] specialTopic 专栏专题 banner
- [x] mallEnter 资源购买入口

## API

- [ ] 首页
- [ ] 用户信息
- [ ] 获取指定类别的资源
- [ ] 资源收藏
- [ ] 搜索

## 参数

|项目|属性|值|备注|
|:---:|:---:|:---:|:---|
|pageHeader|高度|140rpx|页面标题栏的高度|
|tabBar|高度|120rpx|底部自定义 tabBar 的高度|

## 速记和一些坑

- 2rpx = 1px，28px = (28*2)rpx = 56rpx；
- 在 `app.json` 中的 `pages` 中直接输入页面路径，开发工具会自动创建对应的页面和目录；
- 小程序不支持不被认可的 URL，所以，在使用 http/https 请求的内容时，需要登录到 [小程序后台](https://mp.weixin.qq.com/) 进行设置和备案；
- 小程序自动编译预览最大支持 2048 kb，所以，最好不要把图片等占空间资源打包在项目内；
- 组件默认只有一个 `slot`，如果需要使用多个 `slot`，需要在**组件的 `options` 中**声明 `multipleSlots: true`，[官方参考](https://dwz.cn/yFQYMDCC)
- 使用 `wx.navigateTo` 跳转页面，可以使用 query 的形式传递参数，在目标页面使用 `options` 获取参数：
- `web-view` 只能为认证的组织使用，**个人类型与海外类型的小程序暂不支持使用**，[参考](https://dwz.cn/PvNgvoft)。
- 需要使用一个单独的页面获取用户信息，参考官方公告《[小程序与小游戏获取用户信息接口调整，请开发者注意升级。](https://developers.weixin.qq.com/community/develop/doc/0000a26e1aca6012e896a517556c01)》

## 相关资源

- [小程序管理后台](https://mp.weixin.qq.com/)
- [官方教程](https://developers.weixin.qq.com/miniprogram/dev/)

## 相关插件和开发库

- [wepy](https://github.com/Tencent/wepy) WePY (发音: /'wepi/)是一款让小程序支持组件化开发的框架
- [wxParse](https://github.com/icindy/wxParse) wxParse-微信小程序富文本解析自定义组件，支持 HTML 及 markdown 解析
