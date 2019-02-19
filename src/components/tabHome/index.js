// 获取应用实例
const app = getApp();

// 是否需要暂停页面更新
let pushed = false;

// 页面是否已完成初始化
let inited = false;

// 网络实例 RequestTask
let reqTaskInit = null;

Component({

  properties: {

    // 是否隐藏页面
    hidden: {
      type: Boolean,
      value: false,
    },

  },

  data: {
    pending: false, // 页面是否正在加载数据
    networkError: false, // 请求是否出现错误
    page: app.globalData.tabBarSet[0], // 页面信息
    carousel: [], // 主轮播图
    carouselSize: Math.floor((wx.getSystemInfoSync().windowWidth - 40) * (368 / 672)) + 20, // 主轮播图尺寸
    carouselCurrent: 0, // 主轮播图选中索引
    entries: [], // 内容入口
    special: [], // 专栏文章
    media: [], // 多媒体
    scientist: [], // 科学家
    scientistSize: (Math.floor((wx.getSystemInfoSync().windowWidth - 40) / 5)) + 25, // 科学家轮播图尺寸
    books: [], // 书籍
  },

  pageLifetimes: {

    hide() {
      this.pageInitCancel();
    },

  },

  methods: {

    // 轮播图切换时调整选中的条目索引
    carouselChange(e) {
      this.setData({
        carouselCurrent: e.detail.current,
      });
    },

    // 入口条目选择
    entryCheck(e) {
      let item = e.target.dataset.item;
      wx.navigateTo({
        url: `/pages/${item.name}/index`,
      });
    },

    //////////////////////////////////////////////

    // 跳转到搜索页面
    pushToSearch() {
      wx.navigateTo({
        url: "/pages/search/index",
      });
    },

    // 跳转到科学家页面
    pushToScientist() {
      wx.navigateTo({
        url: "/pages/scientist/index",
      });
    },

    // 跳转到专栏页面
    pushToSpecial() {
      wx.navigateTo({
        url: "/pages/special/index",
      });
    },

    // 跳转到媒体页面
    pushToMedia() {
      wx.navigateTo({
        url: "/pages/media/index",
      });
    },

    // 跳转到书籍页面
    pushToBooks() {
      wx.navigateTo({
        url: "/pages/books/index",
      });
    },

    //////////////////////////////////////////////

    // 获取首页数据
    pageInit() {
      let _self = this;

      this.setData({
        pending: true,
        networkError: false,
      });

      if (inited) {
        this.setData(Object.assign({}, {
          pending: false,
        }, wx.getStorageSync('_chache_index')));
        return;
      };

      wx.showNavigationBarLoading();
      wx.showLoading({
        title: '加载中',
      });

      reqTaskInit = wx.request({
        method: 'GET',
        url: `${app.globalData.api}/index`,
        header: app.globalData.httpHeader,
        complete(res) {
          wx.hideNavigationBarLoading();
          wx.hideLoading();

          _self.setData({
            pending: false,
          });

          if (res.errMsg === 'request:fail timeout') {
            _self.setData({
              networkError: true,
            });
          }

        },
        success(res) {
          let data = res.data;

          if (data.statusCode !== '000000') {
            console.error('数据加载失败', data.statusMessage);
            return;
          }

          // 数据写入本地缓存
          wx.setStorageSync('_chache_index', data.data);

          // 更新数据
          _self.setData(data.data);

          // 标记页面已完成初始化
          inited = true;

        },
        error(error) {
          _self.setData({
            pending: false,
            networkError: true,
          });
        },
      });

    },

    // 取消获取首页数据
    pageInitCancel() {
      wx.hideNavigationBarLoading();
      wx.hideLoading();
      this.setData({
        pending: false,
      });
      reqTaskInit.abort();
    },

    //////////////////////////////////////////////

    // 开始事件
    viewStart() {
      this.pageInit();
    },

    // 暂停事件
    viewPush() {
      if (pushed) return;
      pushed = true;
    },

  },

});
