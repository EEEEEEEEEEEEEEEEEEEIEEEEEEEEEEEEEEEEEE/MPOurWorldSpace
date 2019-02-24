const app = getApp();

Page({

  data: {
    pending: false,
    contents: [],
    pageNow: 0, // 当前页码
  },

  loadMore(e) {

  },

  clearHistory() {
    let _self = this;
    wx.showModal({
      title: '提示',
      content: '确定清空历史浏览记录？',
      success(res) {
        if (res.confirm) {
          app.clearHistory(() => {
            _self.setData({
              contents: [],
            });
          });
        }
      }
    });
  },

  onLoad: function (options) {
    try {
      this.setData({
        contents: wx.getStorageSync('history')
      });
    } catch (e) {
      console.log(e);
    }
  },

});
