// 获取应用实例
const app = getApp();

// tabbar 设置
const tabbarSet = [{
  title: "主页",
  icon: "home",
  slogan: "探索自然科学的奥秘",
}, {
  title: "探索",
  icon: "earth",
  slogan: "发现未知 探索自然",
}, {
  title: "我",
  icon: "user",
  slogan: "看得见的成长",
}, ];

Page({

  data: {
    tabSelected: 0, // 高亮页面
    tabbarSet: tabbarSet, // tabbar 数据
    tabbarSelected: tabbarSet[0], // 选择的 tabbar 页面
  },

  ///////////////////////////////////////////////////////////
  // Tabbar 页面切换
  tabCheck(e) {
    let key = parseInt(e.target.dataset['id'], 10);
    if (isNaN(key) || this.tabSelected === key) return;
    this.setData({
      tabSelected: key,
      tabbarSelected: tabbarSet[key],
    });
  },

  ///////////////////////////////////////////////////////////

  onLoad: function() {

  },

});