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
    pushToDetail(e) {
      let item = this.data.item;
      wx.navigateTo({
        url: `/pages/scientistDetail/index?id=${item.id}`,
      });

    },

  },

});
