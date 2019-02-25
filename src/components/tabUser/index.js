const app = getApp();

let pushed = false; // 是否需要暂停页面更新

Component({

  properties: {

    // 是否隐藏页面
    hidden: {
      type: Boolean,
      value: false,
    },

  },

  data: {
    page: app.globalData.tabBarSet[2],
    user: null,
  },

  methods: {

    viewStart() {
      // 检测用户是否已授权
      app.checkLogin(user => {
        this.setData({
          user: user,
        });
      });
    },

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
