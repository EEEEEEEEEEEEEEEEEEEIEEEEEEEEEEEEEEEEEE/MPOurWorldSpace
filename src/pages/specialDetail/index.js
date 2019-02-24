const util = require('../../lib/util.js');
const WxParse = require('../../lib/wxParse/wxParse.js');
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
        let content = data.data;

        if (data.statusCode !== '000000') {
          console.error('数据加载失败', data.statusMessage);
          return;
        }

        // 写入缓存
        app.pushToHistory(id, content.title, util.getPageURL(_self));

        WxParse.wxParse('detail', 'html', data.data.detail, _self);

        _self.setData({
          content: data.data,
        });

      },
    });

  },

  onLoad: function (options) {
    this.getDetail(parseInt(options.id, 10));
    //WxParse.wxParse('detail', 'html', this.data.content.detail, this);
  },

})
