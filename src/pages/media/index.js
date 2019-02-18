// 获取应用实例
const app = getApp();

Page({

  data: {
    pending: false,
    page: 1,
    media: [],
  },

  loadList(page = 1) {
    let _self = this;

    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中',
    });

    this.setData({
      pending: true,
    });

    wx.request({
      method: 'GET',
      url: `${app.globalData.api}/media/index`,
      header: app.globalData.httpHeader,
      data: {
        page: page || 1,
      },
      complete() {
        wx.hideNavigationBarLoading();
        wx.hideLoading();

        _self.setData({
          pending: false,
        });

      },
      success(res) {
        let data = res.data;

        if (data.statusCode !== '000000') {
          console.error(data.statusMessage);
          return;
        }

        let _cahce = [..._self.data.media, ...data.data];
        _self.setData({
          media: _cahce,
        });

      },
    });

  },

  // 加载下一页数据
  loadMore() {
    let page = this.data.page + 1;
    this.setData({
      page: page,
    });
    this.loadList(page);
  },

  onLoad: function (options) {
    this.loadList();
  },

})
