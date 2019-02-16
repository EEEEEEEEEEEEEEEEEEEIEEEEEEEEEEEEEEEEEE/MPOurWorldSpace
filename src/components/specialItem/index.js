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
    tapChange(e) {
      let target = e.target;
      let dataId = target.dataset.id;

      // 点击了收藏按钮
      if (dataId === "like") return this.toggleLike();

      // 点击了分类按钮
      if (dataId === "category") return this.pushToCategory();

      // 转到详情页
      wx.navigateTo({
        url: "/pages/specialDetail/index"
      });
    },

    // 转到分类
    pushToCategory() {
      wx.navigateTo({
        url: "/pages/search/index"
      });
    },

    // 喜欢或取消喜欢
    toggleLike() {
      let item = this.data.item;
      let _self = this;

      if (!item) return;

      main.toggleCollect({
        id: item.id,
        success(){

          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          });

          _self.setData({
            collected: true,
          });

        },
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
