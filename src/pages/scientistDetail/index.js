const WxParse = require('../../lib/wxParse/wxParse.js');

// 获取应用实例
const app = getApp();

Page({

  data: {
    scientist: null,
  },

  // 获取科学家详情
  getScientist() {
    let _self = this;

    wx.showNavigationBarLoading();
    wx.showLoading();

    wx.request({
      url: `${app.globalData.api}/scientist/detail`,
      methods: 'GET',
      data: {
        uid: 0,
      },
      header: app.globalData.httpHeader,
      complete() {
        wx.hideNavigationBarLoading();
        wx.hideLoading();
      },
      success(res) {
        let data = res.data;

        if (data.statusCode !== '000000') {
          console.error(data.statusMessage);
          return;
        }

        WxParse.wxParse('detail', 'html', data.data.detail, _self);

        _self.setData({
          scientist: data.data,
        });

      },
      error(error){
        console.log( error );
      },
    });

  },

  onReady: function (options) {
    this.getScientist();
  },

})
