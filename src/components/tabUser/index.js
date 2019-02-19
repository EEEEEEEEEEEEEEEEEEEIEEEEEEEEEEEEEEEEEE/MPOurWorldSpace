// 获取应用实例
const app = getApp();

// 是否需要暂停页面更新
let pushed = false;

Component({

  properties: {

    // 是否隐藏页面
    hidden: {
      type: Boolean,
      value: false,
    },

  },

  data: {

    // 页面信息
    page: app.globalData.tabBarSet[2],

    user: null,

  },

  methods: {

    //////////////////////////////////////////////
    // 开始事件
    viewStart() {

      // 检测用户是否已授权
      let user = wx.getStorageSync('user');
      if (user !== '') {
        this.setData({
          user: user,
        });
      } else {
        wx.redirectTo({
          url: `/pages/authLogin/index`,
        });
      }

    },

    // 暂停事件
    viewPush() {
      if (pushed) return;
      pushed = true;
    },

    pushToCollect(e) {
      wx.navigateTo({
        url: "/pages/collect/index"
      });
    },

    pushToHistory(e) {
      wx.navigateTo({
        url: "/pages/history/index"
      });
    },

    pushToAbout(e) {
      wx.navigateTo({
        url: "/pages/about/index"
      });
    },

    pushToCoffee(e) {
      wx.navigateTo({
        url: "/pages/coffee/index"
      });
    },

  },

})
