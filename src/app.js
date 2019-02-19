App({

  /**
   * 全局数据
   * 在其他组件和页面中，可以使用 getApp().globalData[key] 进行访问
   */
  globalData: {

    // 开发者信息，具体内容请前往小程序后台进行申请和更新
    app: {
      id: 'wxca195473e9e2b8ae', // 小程序ID
      secret: '4839e69581f92e9be08d7e1d6075fa31', // 小程序密钥
    },

    // 登录用户信息
    user: null,

    // API 地址
    //api: 'https://22aea742-7278-464c-989e-dd4cfd6f40db.mock.pstmn.io',
    api: 'http://10.164.5.17:8806',

    // HTTP 请求头
    httpHeader: {
      appId: '12312312',
      'x-api-key': '93dadbe63be14463aff5cd969940b942',
    },

    // tabBar 预设
    tabBarSet: [{
      title: "主页",
      name: "home",
      icon: "home",
      theme: "blue",
      slogan: "探索自然科学的奥秘",
    }, {
      title: "探索",
      name: "explore",
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

  checkLogin: function () {
    // 检测用户是否已授权
    let user = wx.getStorageSync('user');
    if (user !== '') {
      this.globalData.user = user;
    } else {
      wx.redirectTo({
        url: `/pages/authLogin/index`,
      });
    }
  },

  // 应用运行时执行的内容
  onLaunch: function () {
    // 授权检测
    this.checkLogin();

  },

  // 页面未找到时执行
  onPageNotFound() {},

});
