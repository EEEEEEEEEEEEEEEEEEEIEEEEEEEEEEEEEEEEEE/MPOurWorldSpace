const util = require('../../lib/util.js');
const app = getApp();

Page({

  data: {
    item: null,
    playing: false, // 是否正在播放
    progress: 0, // 播放进度
    currentTime: 0,
    duration: 0,
  },

  // 加载媒体数据
  getMedia(options) {
    let _self = this;
    let id = options.id || 0;

    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中',
    });

    wx.request({
      method: 'GET',
      url: `${app.globalData.api}/media/detail`,
      header: app.globalData.httpHeader,
      data: {
        id: id,
      },
      complete() {
        wx.hideNavigationBarLoading();
        wx.hideLoading();
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

        _self.setData({
          item: data.data,
        });

      },
    });

  },

  onLoad: function (options) {
    this.getMedia(options);
  },

});
