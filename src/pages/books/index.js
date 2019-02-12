const app = getApp(); // 获取应用实例

Page({

  data: {
    categories: [{
      name: '全部',
      key: 0,
    }], // 可用分类
    currentCategory: 0, // 高亮分类
    isPending: false, // 是否正在加载数据
    hasBooks: false, // 是否存在数据
  },

  //////////////////////////////////

  // 获取书籍分类
  getCategories() {
    let _self = this;

    wx.showNavigationBarLoading();
    wx.showLoading();

    this.setData({
      isPending: true,
    });

    wx.request({
      url: `${app.globalData.api}/booksCategories.json`,
      methods: 'GET',
      header: app.globalData.httpHeader,
      complete() {
        wx.hideNavigationBarLoading();
        wx.hideLoading();

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
        let _books;
        if (_self.data.pageNow === 1) {
          _books = resData.data;
        } else {
          _books = [..._self.data.books, ...resData.data];
        }

        // 初始化分类
        let categories = [..._self.data.categories, ...resData.data];

        _self.setData({
          categories: categories,
          categoriesName: categories.map(i => i.name),
        });

      },
      error(err) {
        // 显示错误信息
      },
    });

  },

  // 获取书籍列表
  getBooks() {
    let _self = this;

    wx.showNavigationBarLoading();
    wx.showLoading();

    this.setData({
      isPending: true,
    });

    wx.request({
      url: `${app.globalData.api}/books.json`,
      methods: 'GET',
      data: {
        category: _self.data.currentCategory,
        page: _self.data.pageNow,
      },
      header: app.globalData.httpHeader,
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
        let _books;
        if (_self.data.pageNow === 1) {
          _books = resData.data;
        } else {
          _books = [..._self.data.books, ...resData.data];
        }

        _self.setData({
          books: _books,
          hasBooks: _books.length > 0,
        });

      },
      error(err) {
        // 显示错误信息
      },
    });

  },

  //////////////////////////////////

  onLoad: function () {
    // 获取书籍分类
    this.getCategories();

    console.log(app.globalData.user);
  },

})
