Page({

  data: {
    pending: false, // 是否正在执行请求
  },

  // 用户信息获取回调
  onGotUserInfo: function (e) {
    if (this.data.pending) return;

    let user = e.detail.userInfo;

    // 写入本地缓存
    wx.setStorageSync('user', e.detail.rawData);
    wx.setStorageSync('last_login_at', new Date().getTime());

    // 远程登录

    // 登录跳转
    setTimeout(function () {
      wx.redirectTo({
        url: `/pages/index/index`,
      });
    }, 200);

  },

  onLoad: function (options) {},

})
