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
      wx.navigateTo({
        url: "/pages/scientistDetail/index",
      });

    },

  },

});
