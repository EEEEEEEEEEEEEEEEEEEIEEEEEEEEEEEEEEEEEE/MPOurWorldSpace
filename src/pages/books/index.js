const app = getApp();

// 分类
let categories = [{
  name: '全部',
  key: 0,
}];

// 请求实例
let reqTaskCategory;
let reqTaskBooks;

Page({

  data: {
    categories: categories,
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
    if (reqTaskCategory) {
      reqTaskCategory.abort();
    }

    let _self = this;

    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载分类中',
    });

    this.setData({
      peiding: true,
    });

    app.request({
      cache: true,
      url: `${app.globalData.api}/books/category`,
      complete() {
        wx.hideNavigationBarLoading();
        wx.hideLoading();
        _self.setData({
          peiding: false,
        });
        reqTaskCategory = null;
      },
      success(data) {

        // 初始化分类
        categories = [...categories, ...data];

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
    if (reqTaskBooks) {
      reqTaskBooks.abort();
    }

    let _self = this;
    let current = this.data.currentCategory;

    // 获取对应索引的数据
    let _cache = this.data.books[current];

    wx.showNavigationBarLoading();

    this.setData({
      pending: true,
    });

    app.request({
      cache: true,
      url: `${app.globalData.api}/books/index?category=${_self.data.currentCategory}`,
      complete() {
        wx.hideNavigationBarLoading();
        _self.setData({
          pending: false,
        });
        reqTaskBooks = null;
      },
      success(data) {
        // 设置数据
        if (_cache) {
          _cache = [..._cache, ...data];
        } else {
          _cache = data;
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

  // 设置选择的类别
  changeSet(index) {
    if (index === this.data.currentIndex) return;

    // 更新数据
    this.setData({
      currentIndex: index,
      currentCategory: categories[index].key,
    });

    // 获取书籍列表
    let _cache = this.data.books[index];
    if (!_cache) {
      this.getBooks();
    }
  },

  // 分类切换
  categoryChange(e) {
    this.changeSet(e.detail.currentIndex);
  },

  // swiper 组件切换监听
  swiperChange(e) {
    this.changeSet(e.detail.current);
  },

  //////////////////////////////////
  // 页面初始化完成
  onLoad: function () {
    // 获取书籍分类
    this.getCategories();
  },

})
