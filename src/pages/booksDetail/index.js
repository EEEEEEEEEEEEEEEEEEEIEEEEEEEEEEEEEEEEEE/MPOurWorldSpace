Page({

  data: {

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

  }
})
