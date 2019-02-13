const WxParse = require('../../lib/wxParse/wxParse.js');

// 获取应用实例
const app = getApp();

Page({

  data: {
    pending: false,
    book: null,
  },

  // 打开分享菜单
  openShare() {
    wx.showShareMenu({
      withShareTicket: true,
    });
  },

  onShareAppMessage(res) {
    if (res.from === 'button') {
      console.log(res.target)
    }

    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }

  },

  onLoad(options) {
    let _self = this;
    let id = options.id || 0;

    wx.showNavigationBarLoading();
    wx.showLoading();

    this.setData({
      pending: true,
    });

    wx.request({
      method: 'GET',
      url: `${app.globalData.api}/books/detail`,
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

        WxParse.wxParse('detail', 'html', data.data.overview, _self);

        _self.setData({
          book: data.data,
        });

      },
    });

  },

})
