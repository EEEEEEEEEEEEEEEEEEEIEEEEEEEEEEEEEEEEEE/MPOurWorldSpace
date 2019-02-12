const app = getApp(); // 获取应用实例
const query = wx.createSelectorQuery(); // 对象选择

Page({

  data: {
    tabBarSet: app.globalData.tabBarSet,
    tabBarKeySelected: 0, // 高亮页面索引
    tabBarSelected: 0, // 高亮页面
  },

  ///////////////////////////////////////////////////////////
  // Tabbar 页面切换
  tabCheck(e) {
    this.tabFlip(parseInt(e.target.dataset['id'], 10));
  },

  tabFlip(key) {
    if (isNaN(key)) return;

    // 获取当前条目对应的显示信息，在 app.js 中定义。
    let item = this.data.tabBarSet[key];

    /**
     * 触发子组件的事件
     * 遍历所有视图，如果视图是显示的，则触发视图的 viewStart 自定义事件；
     * 子组件的 viewStart 类似于普通页面的 onShow
     * 子组件的 viewPush 类似于普通页面的 onHide
     */
    this.data.tabBarSet.forEach((s, i) => {
      var sc = this.selectComponent(`#${s.name}`);
      if(!sc) return;
      if (i === key) {
        sc.viewStart();
      } else {
        sc.viewPush();
      }
    });

    // 更新数据
    this.setData({
      tabBarKeySelected: key,
      tabBarSelected: item,
    });

  },

  ///////////////////////////////////////////////////////////

  onLoad: function (options) {
    this.tabFlip(0);
  },

});
