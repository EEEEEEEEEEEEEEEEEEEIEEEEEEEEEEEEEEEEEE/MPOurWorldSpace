const main = require('../../lib/main');

// 获取应用实例
const app = getApp();

Page({

  data: {
    codePath: null,
  },

  // 远程下载赞赏码图片
  getCodeImage() {
    let _self = this;

    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中',
    });

    wx.downloadFile({
      url: `${app.globalData.api}/public/code_admire`,
      header: app.globalData.httpHeader,
      complete() {
        wx.hideNavigationBarLoading();
        wx.hideLoading();
      },
      success(res) {
        _self.setData({
          codePath: res.tempFilePath,
        });
      }
    });

  },

  // 保存图片到本地相册
  saveImage() {
    let _self = this;

    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中',
    });

    wx.saveImageToPhotosAlbum({
      filePath: this.data.codePath,
      complete() {
        wx.hideNavigationBarLoading();
        wx.hideLoading();
      },
      success() {
        wx.showToast({
          title: "保存成功",
          icon: "success",
        });
      },
      fail(error) {
        // 取消操作 
        if (error.errMsg === 'saveImageToPhotosAlbum:fail cancel') return;

        // 操作失败
        wx.showModal({
          title: '图片保存失败',
          content: '赞赏码保存失败，请重试！',
          success(res) {
            if (res.confirm) return _self.saveImage();
          }
        });
      },
    });
  },

  // 获取相关权限并保存文件
  submitSaveImage(e) {
    let _self = this;
    let scope = 'scope.writePhotosAlbum';

    main.authDo({
      scope: 'scope.writePhotosAlbum',
      success: _self._saveImage,
    });

  },

  onLoad: function (options) {
    this.getCodeImage();
  },

});
