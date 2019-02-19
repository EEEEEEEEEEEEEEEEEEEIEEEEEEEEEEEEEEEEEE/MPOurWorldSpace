// 应用全局封装

// 获取应用实例
const app = getApp();

/**
 * 网络请求，可使用本地缓存
 * @param {*} options 
 */
const request = options => {
  options = Object.assign({}, {
    cache: false, // 使用否使用缓存
    expires: 43200000, // 有效期，默认为 12小时
    method: 'GET', // 请求方式
    header: app.globalData.httpHeader,
    url: null, // 请求地址
    complete: () => {},
    success: () => {},
    error: () => {},
  }, options);

  // 获取当前时间作为缓存时间戳
  let now = new Date().getTime();

  // 请求标识
  let key = `_api_${options.method}-${options.url}`;

  // 优先查询缓存
  if (options.cache) {
    let cache = wx.getStorageSync(key);

    if (cache && (now - cache.expires) < options.expires) {
      options.complete({});
      options.success(cache.data);
      return;
    }

  }

  // 请求新数据
  wx.request({
    method: options.method,
    url: options.url,
    complete(res) {
      options.complete(res);
    },
    success(res) {
      let data = res.data;

      if (data.statusCode !== '000000') {
        console.error(data.statusMessage);
        return;
      }

      // 写入缓存
      if (options.cache) {
        wx.setStorageSync(key, {
          expires: new Date().getTime(),
          data: data.data,
        });
      }

      options.success(data.data);
    },
  });

};

/**
 * 切换收藏
 * @param {Object} options 回调
 */
const toggleCollect = options => {
  // 参数继承
  options = Object.assign({}, {
      id: null, // 内容 ID 标识
      success: () => {},
      error: () => {}
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
    success: () => {},
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
  request,
  toggleCollect,
  authDo,
};
