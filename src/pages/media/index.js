// 获取应用实例
const app = getApp();

Page({

  data: {
    pending: false,
    media: [],
  },

  getlist() {
    let _self = this;

    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中',
    });

    this.setData({
      isPending: true,
    });

    wx.request({
      method: 'GET',
      url: `${app.globalData.api}/media/index`,
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

        // 初始化分类
        let _cahce = [..._self.data.media, ...data.data];

        // 设置数据
        _self.setData({
          media: _cahce,
        });

      },
    });
  },

  onLoad: function (options) {
    this.getlist();
  },

})