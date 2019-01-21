Page({

  data: {
    books: [], // 书籍列表
    pageNow: 1, // 当前页码
    isPending: false, // 是否正在加载数据
    hasBooks: false, // 是否存在数据
  },

  //////////////////////////////////

  // 获取书籍列表
  getBooks() {
    let _self = this;

    wx.showNavigationBarLoading();
    wx.showLoading();

    this.setData({
      isPending: true,
    });

    wx.request({
      url: 'https://raw.githubusercontent.com/djyuning/MPOurWorldSpace/master/data/books.json',
      methods: 'GET',
      data: {
        page: _self.data.pageNow,
      },
      header: {
        'appId': '12312312'
      },
      complete(){
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
        if(resData.statusCode !== '000000'){
          console.error( resData.statusMessage );
          return;
        }

        // 设置数据
        let _books;
        if(_self.data.pageNow === 1){
          _books = resData.data;
        } else {
          _books = [..._self.data.books, ...resData.data];
        }

        _self.setData({
          books: _books,
          hasBooks: _books.length > 0,
        });

      },
      error(err){
        // 显示错误信息
      },
    });
  },

  //////////////////////////////////

  onLoad: function () {
    this.getBooks();
  },

  // 下拉刷新第一页数据
  onPullDownRefresh: function () {
    this.setData({
      pageNow: 1, // 页面增加
    });
    this.getBooks();
  },

  // 上拉加载更多数据
  onReachBottom: function () {
    this.setData({
      pageNow: this.data.pageNow + 1, // 页面增加
    });
    this.getBooks();
  },

})
