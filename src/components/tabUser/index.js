// 获取应用实例
const app = getApp();

// 是否需要暂停页面更新
let pushed = false;

Component({

  data: {
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
          user: JSON.parse(user),
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

    //////////////////////////////////////////////
    // 跳转到关于我们
    pushToAbout(e) {
      wx.navigateTo({
        url: "/pages/about/index"
      });
    }

  },

})
