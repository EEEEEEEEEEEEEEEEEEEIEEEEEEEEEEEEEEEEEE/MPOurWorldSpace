const util = require('/lib/util.js');

App({

  /**
   * 全局数据
   * @description 在其他组件和页面中，可以使用 `getApp().globalData[key]` 进行访问
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
    api: 'http://192.168.0.105:8806',

    // HTTP 请求头
    httpHeader: {
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

  /**
   * 登录验证
   * @description 检测用户是否已登录，未登录则跳转到授权登录页面
   */
  checkLogin: function () {
    let user = wx.getStorageSync('user');
    if (user !== '') {
      this.globalData.user = user;
    } else {
      wx.redirectTo({
        url: `/pages/authLogin/index`,
      });
    }
  },

  /**
   * 添加条目到历史记录
   */
  pushToHistory(id, title, url) {
    let historyName = 'history';
    let _cache = [];

    // 获取本地缓存
    try {
      // 读取本地缓存
      _cache = wx.getStorageSync(historyName) || [];

      // 是否存在当前条目
      let index = _cache.findIndex(item => item.id === id);
      if (index !== -1) {
        _cache.push(_cache.splice(index, 1)[0]);
      } else {
        // 添加新数据
        _cache.push({
          id: id,
          title: title,
          url: url,
          browser_at: util.formatTime(new Date),
        });
      }

      // 更新缓存
      wx.setStorageSync(historyName, _cache);

    } catch (e) {
      console.log(e);
    }

  },

  clearHistory(callback) {
    try {
      wx.removeStorageSync('history');
      callback();
    } catch (e) {
      console.log(e);
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
