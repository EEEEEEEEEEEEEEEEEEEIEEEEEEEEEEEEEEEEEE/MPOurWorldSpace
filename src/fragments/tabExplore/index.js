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
    page: app.globalData.tabBarSet[1], // 页面信息
    inited: false,
    pending: false,
    loading: false,
    ended: false,
    explores: [],
    pageNow: 1,
    pageSize: app.globalData.pageSize || 20,
  },

  methods: {

    loadList() {
      return new Promise((resolve, reject) => {
        let _self = this;
        let _cache = this.data.explores || [];

        wx.showNavigationBarLoading();
        wx.showLoading({
          title: '加载中',
        });

        app.request({
          cache: true,
          url: `${app.globalData.api}/explore/index`,
          data: {
            page: _self.data.pageNow,
            page_size: _self.data.pageSize,
          },
          complete() {
            wx.hideNavigationBarLoading();
            wx.hideLoading();
          },
          success(res) {
            let resData = res.data;
            let data = resData.data;

            if (resData.statusCode !== '000000') {
              return wx.redirectTo({
                url: `/pages/networkError/index`,
              });
            }

            _self.setData({
              explores: [..._cache, ...data.list],
              ended: data.ended || false,
            });

            resolve();

          },
          fail(e) {
            reject(e);
          },
        });

      });
    },

    pageNext() {
      if (this.data.ended) return;

      this.setData({
        pageNow: this.data.pageNow + 1,
        loading: true,
      });

      this.loadList().then((res) => {
        this.setData({
          loading: false,
        });
      });

    },

    pageInit() {
      if (this.data.inited) return;

      this.setData({
        pending: true,
      });

      this.loadList().then((res) => {
        this.setData({
          inited: true,
          pending: false,
        });
      });

    },

    viewStart() {
      this.pageInit();
    },

    viewPush() {
      if (pushed) return;
      pushed = true;
    },

  }
})
