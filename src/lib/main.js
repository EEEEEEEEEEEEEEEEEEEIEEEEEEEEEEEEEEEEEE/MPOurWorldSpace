// 应用全局封装

// 获取应用实例
const app = getApp();

/**
 * 切换收藏
 * @param {Object} options 回调
 */
const toggleCollect = options => {
  // 参数继承
  options = Object.assign({}, {
    id: null, // 内容 ID 标识
    success: () => { },
    error: () => { }
  },
    options
  );

  // 锁定状态
  wx.showNavigationBarLoading();

  wx.request({
    method: "GET",
    url: `${app.globalData.api}/public/collect`,
    header: app.globalData.httpHeader,
    data: {
      id: options.id,
    },
    complete() {
      wx.hideNavigationBarLoading();
    },
    success(res) {
      let data = res.data;

      if (data.statusCode !== "000000") {
        wx.showModal({
          title: "出错了",
          content: data.statusMessage
        });
        options.error(data);
        return;
      }

      options.success(data);
    },
    error(error) {
      wx.showModal({
        title: "出错了",
        content: "添加收藏失败，请稍后再试！"
      });
    }
  });
};

/**
 * 检测授权并执行操作
 * @description 某些特殊操作可能需要首先后才能操作，这里一并封装调用
 * @param {*} options 
 */
const authDo = (options) => {
  options = Object.assign({}, {
    scope: null,
    success: () => { },
  }, options);

  wx.getSetting({
    success(res) {
      if (!res.authSetting[options.scope]) {
        wx.authorize({
          scope: options.scope,
          success() {
            // 授权成功后执行
            options.success();
          },
        });
        return;
      }

      // 已授权，直接执行
      options.success();
    }
  });

};

module.exports = {
  toggleCollect,
  authDo,
};