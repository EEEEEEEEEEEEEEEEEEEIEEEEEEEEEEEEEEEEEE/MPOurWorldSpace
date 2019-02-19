const main = require("../../lib/main");

Component({

  properties: {

    // 条目
    item: {
      type: Object,
      value: null
    }

  },

  data: {
    collected: false,
  },

  methods: {

    // 跳转到详情页
    pushToDetail(e) {
      let item = this.data.item;
      wx.navigateTo({
        url: `/pages/specialDetail/index?id=${item.id}`,
      });
    },

  },

  attached() {
    let item = this.data.item;
    this.setData({
      collected: item.collected ? true : false,
    });

  },

});
