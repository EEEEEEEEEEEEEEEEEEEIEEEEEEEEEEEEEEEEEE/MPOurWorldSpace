const main = require('../../lib/main');
const app = getApp();

let pushed = false; // 是否需要暂停页面更新
let inited = false; // 页面是否已完成初始化
let pageNow = 1; // 当前页码
let pageSize = 20; // 分页大小

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
    pending: false,
    loading: false,
    ended: false,
    explores: [],
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
            page: pageNow,
            page_size: pageSize,
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

      pageNow += 1;

      this.setData({
        loading: true,
      });

      this.loadList().then((res) => {
        this.setData({
          loading: false,
        });
      });

    },

    pageInit() {
      if (inited) return;

      this.setData({
        pending: true,
      });

      this.loadList().then((res) => {
        inited = true;
        this.setData({
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
