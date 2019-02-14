// 获取应用实例
const app = getApp();

// 是否需要暂停页面更新
let pushed = false;

// 页面是否已完成初始化
let inited = false;

// 是否正在加载数据
let pending = false;

Component({

  properties: {

    // 是否隐藏页面
    hidden: {
      type: Boolean,
      value: false,
    },

  },

  data: {
    page: app.globalData.tabBarSet[1], // 页面信息
    explores: [],
  },

  methods: {

    //////////////////////////////////////////////

    // 获取探索内容列表
    getList() {
      let _self = this;
      let _cache = this.data.explores;

      wx.showNavigationBarLoading();
      wx.showLoading({
        title: '加载中',
      });

      wx.request({
        method: 'GET',
        url: `${app.globalData.api}/explore/index`,
        header: app.globalData.httpHeader,
        complete() {
          wx.hideNavigationBarLoading();
          wx.hideLoading();
        },
        success(res) {
          let data = res.data;

          if (data.statusCode !== '000000') {
            console.error(data.statusMessage);
            return;
          }

          if (_cache) {
            _cache = [..._cache, ...data.data];
          } else {
            _cache = data.data;
          }

          _self.setData({
            explores: _cache,
          });

          // 标记状态
          inited = true;
          pending = false;

        },
      });

    },

    // 滚动到底部时加载更多数据
    lower(e) {
      if (pending) return;
      pending = true;
      this.getList();
    },

    //////////////////////////////////////////////
    // 开始事件
    viewStart() {
      if (!inited) {
        this.getList();
      }
    },

    // 暂停事件
    viewPush() {
      if (pushed) return;
      pushed = true;
    },

  }
})
