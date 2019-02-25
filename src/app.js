const util = require('/lib/util.js');

let httpHeader = {
  'x-api-key': '93dadbe63be14463aff5cd969940b942',
};

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
    httpHeader: httpHeader,

    pageSize: 20, // 每页显示数据条数

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

  // 网络请求，可使用本地缓存
  request(options) {
    options = Object.assign({}, {
      cache: false, // 使用否使用缓存
      expires: 43200000, // 有效期，默认为 12小时
      method: 'GET', // 请求方式
      header: httpHeader,
      data: null,
      url: null, // 请求地址
      complete: () => {},
      success: () => {},
      fail: () => {},
    }, options);

    let now = new Date().getTime();
    let keyRequest;
    let key;

    // 请求标识
    key = `_api_${options.method}-${options.url}`;
    if (options.data) {
      for (let k in options.data) {
        key += `-${k}=${options.data[k]}`;
      }
    }

    // 优先查询缓存
    if (options.cache) {
      let cache = wx.getStorageSync(key);
      if (cache && (now - cache.expires) < options.expires) {
        options.complete(cache.data);
        options.success(cache.data);
        return;
      }
    }

    // 取消已存在的同名请求
    if (keyRequest) {
      keyRequest.abort();
    }

    // 请求新数据
    keyRequest = wx.request({
      method: options.method,
      url: options.url,
      header: options.header,
      data: options.data,
      complete(res) {
        options.complete(res);
      },
      success(res) {

        // 写入缓存
        if (options.cache) {
          wx.setStorageSync(key, {
            expires: new Date().getTime(),
            data: res,
          });
        }

        options.success(res);
      },
      fail(e) {
        options.fail(e);
      },
    });

  },

  // 网络请求成功，但服务器返回了错误的信息
  requestError(res) {
    return wx.redirectTo({
      url: `/pages/networkError/index`,
    });
  },

  /**
   * 登录验证
   * @description 检测用户是否已登录，未登录则跳转到授权登录页面
   */
  checkLogin: function (callback) {
    let user = wx.getStorageSync('user');
    if (user !== '') {
      this.globalData.user = user;
      callback(user);
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
  onLaunch: function () {},

  // 页面未找到时执行
  onPageNotFound() {},

});
