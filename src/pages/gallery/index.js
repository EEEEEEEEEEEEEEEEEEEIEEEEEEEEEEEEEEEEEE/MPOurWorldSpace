// 获取应用实例
const app = getApp();

Page({

  data: {
    pending: false,
    gallery: [],
  },

  getList() {
    let _self = this;
    let _cache = this.data.gallery;

    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中',
    });

    this.setData({
      pending: true,
    });

    wx.request({
      method: 'GET',
      url: `${app.globalData.api}/gallery/index`,
      header: app.globalData.httpHeader,
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

        if (_cache) {
          _cache = [..._cache, ...data.data];
        } else {
          _cache = data.data;
        }

        _self.setData({
          gallery: _cache,
        });

      },
    });

  },

  onLoad: function (options) {
    this.getList();
  },

})
