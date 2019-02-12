// 是否需要暂停页面更新
let pushed = false;

// 获取应用实例
const app = getApp();

Component({

  properties: {

    // 是否隐藏页面
    hidden: {
      type: Boolean,
      value: false,
    },

  },

  data: {

    // 主轮播图
    carousel: [],

    // 主轮播图尺寸
    carouselSize: Math.floor((wx.getSystemInfoSync().windowWidth - 40) * (368 / 672)) + 20,

    // 主轮播图选中索引
    carouselCurrent: 0,

    // 内容入口
    entries: [],

    // 专栏文章
    special: [],

    // 多媒体
    media: [],

    // 科学家
    scientist: [],

    // 科学家轮播图尺寸
    scientistSize: (Math.floor((wx.getSystemInfoSync().windowWidth - 40) / 5)) + 25,

    // 书籍
    books: [],

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

    // 跳转到搜索页面
    pushToSearch() {
      wx.navigateTo({
        url: "/pages/search/index",
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

      wx.showNavigationBarLoading();
      wx.showLoading();

      wx.request({
        url: `${app.globalData.api}/index`,
        methods: 'GET',
        header: app.globalData.httpHeader,
        complete() {
          wx.hideNavigationBarLoading();
          wx.hideLoading();
        },
        success(res) {
          let data = res.data;

          // 失败
          if (data.statusCode !== '000000') {
            console.error('数据加载失败', data.statusMessage);
            return;
          }

          // 更新数据
          _self.setData(data.data);
          
        },
      });

    },

    //////////////////////////////////////////////

    // 开始事件
    viewStart() {
      // 获取首页数据
      this.pageInit();
    },

    // 暂停事件
    viewPush() {
      if (pushed) return;
      pushed = true;
    },

  },

});
