const app = getApp();

Component({

  properties: {

    // 分类 ID，0 为全部
    category: {
      type: [Number, String],
      value: 0,
    },

  },

  data: {
    inited: false,
    pending: false,
    loading: false,
    ended: false,
    scientist: [],
    pageNow: 1,
    pageSize: 20,
  },

  methods: {

    loadList() {
      let _self = this;
      let _cache = this.data.scientist || [];
      let type = this.data.category;

      wx.showNavigationBarLoading();
      wx.showLoading({
        title: '加载中',
      });

      return new Promise((resolve, reject) => {
        app.request({
          cache: false,
          url: `${app.globalData.api}/scientist/index`,
          data: {
            type: type,
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
              scientist: [..._cache, ...data],
              ended: data.ended || false,
            });

            resolve();

          },
          error(error) {
            reject(error);
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

  }

});
