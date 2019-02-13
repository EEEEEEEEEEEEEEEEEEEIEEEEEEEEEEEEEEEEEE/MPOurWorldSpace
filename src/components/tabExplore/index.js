// 是否需要暂停页面更新
let pushed = false;

// 获取应用实例
const app = getApp();

const nav = [
  { key: 0, name: '热度榜' },
  { key: 1, name: '专题' },
  { key: 2, name: '看' },
  { key: 3, name: '听' },
  { key: 4, name: '读书' },
  { key: 5, name: '微博' },
  { key: 6, name: '圈子' },
];

Component({

  properties: {

    // 是否隐藏页面
    hidden: {
      type: Boolean,
      value: false,
    },

  },

  data: {
    // 页面信息
    page: app.globalData.tabBarSet[1],

    nav: nav.map(n => n.name),

  },

  methods: {

    //////////////////////////////////////////////
    // 开始事件
    viewStart() {
      if (!pushed) return;
      pushed = false;
    },

    // 暂停事件
    viewPush() {
      if (pushed) return;
      pushed = true;
    },

  }
})
