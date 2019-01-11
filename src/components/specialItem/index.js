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
      console.log(this.data.item, e);

      let target = e.target;
      let dataId = target.dataset.id;

      // 点击了收藏按钮
      if (dataId === 'like') return this.toggleLike();

      // 点击了分类按钮
      if (dataId === 'category') return this.pushToCategory();

      // 转到详情页
      wx.navigateTo({
        url: "/pages/search/index",
      });

    },

    // 转到分类
    pushToCategory() {
      wx.navigateTo({
        url: "/pages/search/index",
      });
    },

    // 喜欢或取消喜欢
    toggleLike() {
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      });
    },

  },

});
