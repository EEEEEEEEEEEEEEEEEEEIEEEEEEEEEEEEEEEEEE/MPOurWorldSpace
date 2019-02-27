const app = getApp();

let user;
let jsCode;
let authData;

Page({

  data: {
    pending: false, // 是否正在执行请求
  },

  // 初始化远程账户
  _wxLogin() {
    return new Promise((resolve, reject) => {

      wx.showNavigationBarLoading();
      wx.showLoading({
        title: '加载中',
      });

      wx.login({
        complate(res) {
          wx.hideNavigationBarLoading();
          wx.hideLoading();
        },
        success(res) {
          jsCode = res.code;
          resolve(res.code);
        },
        fail(e) {
          reject(e);
        },
      });

    });
  },

  // 使用 code 换取用户的唯一标识（openid）及本次登录的会话密钥（session_key）
  _jscode2session() {
    return new Promise((resolve, reject) => {

      wx.showNavigationBarLoading();
      wx.showLoading({
        title: '验证中',
      });

      // 换取用户唯一标识等信息
      wx.request({
        method: 'GET',
        url: 'https://api.weixin.qq.com/sns/jscode2session',
        header: app.globalData.httpHeader,
        data: {
          appid: app.globalData.app.id,
          secret: app.globalData.app.secret,
          js_code: jsCode,
          grant_type: 'authorization_code',
        },
        complate(res) {
          wx.hideNavigationBarLoading();
          wx.hideLoading();
        },
        success(res) {
          // 如：{session_key: "i8vG38lfJAdvbplD4DZDgQ==", openid: "oiLgc5OTwONtKZT-PcqP76EM0m8A"}
          authData = res.data;
          resolve(res.data);
        },
        fail(e) {
          reject(e);
        },
      });

    });
  },

  // 登录我们自己的服务器
  _login() {
    return new Promise((resolve, reject) => {

      wx.showNavigationBarLoading();
      wx.showLoading({
        title: '正在登录',
      });

      wx.request({
        method: 'POST',
        url: `${app.globalData.api}/user/login`,
        header: app.globalData.httpHeader,
        data: Object.assign({}, authData, {
          user: user,
        }),
        complate(res) {
          wx.hideNavigationBarLoading();
          wx.hideLoading();
        },
        success(res) {
          resolve(res);
        },
        fail(e) {
          reject(e);
        },
      });

    });
  },

  // 用户信息获取回调
  onGotUserInfo: function (e) {
    if (this.data.pending) return;

    // 获取用户信息
    user = e.detail.userInfo;

    /**
     * 初始化远程账户
     * 首先，使用 wx.login 获取登录凭证（code）；
     * 然后，使用 code 换取用户的唯一标识（openid）及本次登录的会话密钥（session_key）
     * 开发者远程基于 openid 创建用户数据
     */
    this._wxLogin()
      .then(this._jscode2session)
      .then(this._login)
      .then(() => {

        // 写入本地缓存
        wx.setStorageSync('uid', authData.openid);
        wx.setStorageSync('user', user);
        wx.setStorageSync('last_login_at', new Date().getTime());

        // 登录跳转
        wx.reLaunch({
          url: `/pages/index/index`,
        });

      }).catch(e => {
        wx.redirectTo({
          url: `/pages/networkError/index`,
        });
      });

  },

})
