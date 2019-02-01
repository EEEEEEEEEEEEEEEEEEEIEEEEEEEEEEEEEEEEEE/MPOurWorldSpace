Component({

  properties: {

    // 条目
    item: {
      type: Object,
      value: null,
    },

  },

  methods: {

    // 跳转到详情页
    tapChange(e) {
      let target = e.target;
      let dataId = target.dataset.id;
      // 转到详情页
      wx.navigateTo({
        url: "/pages/booksDetail/index",
      });
    },

  },

});
