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

## API

## 速记和一些坑
- 2rps = 1px，28px = (28*2)rpx = 56rpx；
- 小程序不支持不认可的 URL 访问，所以，在使用 http/https 请求的内容时，需要登录到[小程序后台](https://mp.weixin.qq.com/)进行修改和备案；
- 域名未备案的话，直接真机调试，图片可能不显示，需要在真机上切换到调试模式 —— 点击右上角的胶囊按钮三个点，在弹出的面板选择【打开调试】，重启小程序即可看到图片；
- 小程序自动编译预览最大支持 2048 kb，所以，最好不要把图片等占空间资源打包在项目内；
- 组件默认只有一个 `slot`，如果需要使用多个 `slot`，需要在组件的 `options` 中声明 `multipleSlots: true`，参考：https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html#%E7%BB%84%E4%BB%B6wxml%E7%9A%84slot
- 使用 `wx.navigateTo` 跳转页面，可以使用 query 的形式传递参数，在目标页面使用 `options` 获取参数：
- `web-view` 只能为认证的组织使用，**个人类型与海外类型的小程序暂不支持使用**。https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html

## 相关资源
- [官方教程](https://developers.weixin.qq.com/miniprogram/dev/)
