// 获取应用实例
const app = getApp();

Page({

  data: {
    categories: [{
      name: '全部',
      key: 0,
    }], // 可用分类
    books: {},
    currentIndex: 0, // 高亮的索引
    currentCategory: 0, // 高亮分类
    currentCategoryPage: 0,
    isPending: false, // 是否正在加载数据
    hasBooks: false, // 是否存在数据
  },

  //////////////////////////////////

  // 获取书籍分类
  getCategories() {
    let _self = this;

    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中',
    });

    this.setData({
      isPending: true,
    });

    wx.request({
      method: 'GET',
      url: `${app.globalData.api}/books/category`,
      header: app.globalData.httpHeader,
      success(res) {
        let resData = res.data;

        // 返回了错误数据
        if (resData.statusCode !== '000000') {
          console.error(resData.statusMessage);
          return;
        }

        // 初始化分类
        let categories = [..._self.data.categories, ...resData.data];

        // 设置数据
        _self.setData({
          categories: categories,
          categoriesName: categories.map(i => i.name),
          currentCategory: categories[0].key,
        });

        // 加载对应的书籍数据
        _self.getBooks();

      },
    });

  },

  // 获取书籍列表
  getBooks() {
    let _self = this;
    let current = _self.data.currentCategory;
    let _cache = this.data.books[current];

    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中',
    });

    this.setData({
      isPending: true,
    });

    wx.request({
      method: 'GET',
      url: `${app.globalData.api}/books/index`,
      header: app.globalData.httpHeader,
      data: {
        category: _self.data.currentCategory,
      },
      complete() {
        wx.hideNavigationBarLoading();
        wx.hideLoading();

        wx.stopPullDownRefresh();

        _self.setData({
          isPending: false,
        });

      },
      success(res) {
        let resData = res.data;

        // 返回了错误数据
        if (resData.statusCode !== '000000') {
          console.error(resData.statusMessage);
          return;
        }

        // 设置数据
        if (_cache) {
          _cache = [..._cache, ...resData.data];
        } else {
          _cache = resData.data;
        }

        // 设置数据
        _self.setData({
          books: Object.assign({}, _self.data.books, {
            [current]: _cache,
          }),
        });

      },
    });

  },

  // 分类切换
  categoryChange(e) {
    let detail = e.detail;
    let index = detail.currentIndex;
    let current = this.data.categories.find(c => c.name === detail.current).key;

    // 更新数据
    this.setData({
      currentIndex: index,
      currentCategory: current,
    });

    // 获取书籍列表
    let _cache = this.data.books[current];
    if (!_cache) {
      this.getBooks();
    }

  },

  //////////////////////////////////
  // 页面初始化完成
  onLoad: function () {
    // 获取书籍分类
    this.getCategories();
  },

})
