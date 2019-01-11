App({

  /**
   * 全局数据
   * 在其他组件和页面中，可以使用 this.globalData[key] 进行访问
   */
  globalData: {
    // 登录用户信息
    userInfo: null,

    // tabBar 数据
    tabBarSet: [{
      title: "主页",
      name: "home",
      icon: "home",
      theme: "blue",
      slogan: "探索自然科学的奥秘",
    }, {
      title: "探索",
      name: "feed",
      icon: "earth",
      theme: "green",
      slogan: "发现未知 探索自然",
    }, {
      title: "我",
      name: "user",
      icon: "user",
      theme: "orange",
      slogan: "看得见的成长",
    }, ],
  },

  // 应用运行时执行的内容
  onLaunch: function () {

    // 请求用户登录
    wx.login({
      success: res => { }
    });

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          });
        }
      }
    });

  },

  // 页面未找到时执行
  onPageNotFound() { },

  onHide() {},

  onShow() {},

});
