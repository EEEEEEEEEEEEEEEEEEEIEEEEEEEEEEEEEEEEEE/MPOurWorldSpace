// 获取应用实例
const app = getApp();

// 科学家类别
let types = [];

// 选中的科学家类别，0 为全部
let currentType = null;

Page({

  data: {
    types: [],
    scientist: [],
  },

  ///////////////////////////////////////////////

  // 获取科学家分类
  getTypes() {
    let _self = this;
    return new Promise(function (resolve, reject) {
      wx.request({
        method: 'GET',
        url: `${app.globalData.api}/scientist/types`,
        header: app.globalData.httpHeader,
        success(res) {
          let data = res.data;

          if (data.statusCode !== '000000') {
            console.error('数据加载失败', data.statusMessage);
            return;
          }

          types = [{
            id: 0,
            name: '全部',
          }, ...data.data];

          currentType = types[0];

          _self.setData({
            types: types.map(t => t.name),
          });

          resolve();
        },
        error(error) {
          reject(error);
        },
      });
    });
  },

  // 获取科学家列表
  getList() {
    let _self = this;
    console.log(currentType);
    if (!currentType) return;

    return new Promise(function (resolve, reject) {
      wx.request({
        method: 'GET',
        url: `${app.globalData.api}/scientist/index`,
        header: app.globalData.httpHeader,
        data: {
          type: currentType.id,
        },
        success(res) {
          let data = res.data;

          if (data.statusCode !== '000000') {
            console.error('数据加载失败', data.statusMessage);
            return;
          }

          _self.setData({
            scientist: [..._self.data.scientist, ...data.data],
          });

          resolve();
        },
        error(error) {
          reject(error);
        },
      });
    });
  },

  ///////////////////////////////////////////////

  typesChange(e) {
    // 获取选中的条目
    currentType = types.find(t => t.name === e.detail.current);

    // 更新列表

  },

  ///////////////////////////////////////////////

  onLoad: function (options) {

    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中',
    });

    this.getTypes().then(this.getList).then(() => {
      wx.hideNavigationBarLoading();
      wx.hideLoading();
    });
  },

})
