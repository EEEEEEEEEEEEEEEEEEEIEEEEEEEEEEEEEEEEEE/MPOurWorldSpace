const app = getApp();

let types = [];
let currentType = null;

Page({

  data: {
    types: [],
    typesNav: [],
    current: 0,
  },

  // 获取科学家分类
  getTypes() {
    let _self = this;

    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中',
    });

    return new Promise((resolve, reject) => {
      app.request({
        cache: true,
        url: `${app.globalData.api}/scientist/types`,
        complete() {
          wx.hideNavigationBarLoading();
          wx.hideLoading();
        },
        success(res) {
          let resData = res.data;
          let data = resData.data;

          if (resData.statusCode !== '000000') {
            return wx.redirectTo({
              url: `/pages/networkError/index`,
            });
          }

          types = [{
            id: 0,
            name: '全部',
          }, ...data];

          currentType = types[0];

          _self.setData({
            types: types,
            typesNav: types.map(t => t.name),
          });

          resolve();

        },
        error(e) {
          reject(e);
        },
      });
    });

  },

  typesChange(e) {
    this.setData({
      current: e.detail.currentIndex,
    });
    this.flipList(e.detail.currentIndex);
  },

  swiperChange(e) {
    this.setData({
      current: e.detail.current,
    });
    this.flipList(e.detail.current);
  },

  flipList(index = 0) {
    let sc = this.selectComponent(`#list-${index}`);
    sc.pageInit();
  },

  onLoad: function (options) {
    this.getTypes().then(() => {
      this.flipList();
    });
  },

});
