// 获取应用实例
const app = getApp();

Page({

  data: {
    pending: false,
    special: [],
  },

  // 获取专题列表
  loadList(){
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
      url: `${app.globalData.api}/special/index`,
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
        let _cache = [..._self.data.special, ...data.data];

        // 设置数据
        _self.setData({
          special: _cache,
        });

      },
    });
  },

  onLoad: function (options) {
    this.loadList();
  },

})