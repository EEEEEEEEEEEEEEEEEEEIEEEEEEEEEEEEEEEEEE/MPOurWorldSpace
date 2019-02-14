const WxParse = require('../../lib/wxParse/wxParse.js');

// 获取应用实例
const app = getApp();

Page({

  data: {
    pending: false,
    content: null,
  },

  getDetail(id) {
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
      url: `${app.globalData.api}/special/detail`,
      header: app.globalData.httpHeader,
      data: {
        id: id,
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
          console.error('数据加载失败', data.statusMessage);
          return;
        }

        WxParse.wxParse('detail', 'html', data.data.detail, _self);

        _self.setData({
          content: data.data,
        });

      },
    });

  },

  onLoad: function (options) {
    options.id = 12;

    this.getDetail(options.id);

    //WxParse.wxParse('detail', 'html', this.data.content.detail, this);
  },

})
