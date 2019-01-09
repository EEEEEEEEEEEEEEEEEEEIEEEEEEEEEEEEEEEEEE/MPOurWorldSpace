Page({

  data: {

    // 主轮播图
    carousel: [{
      image: "https://github.com/djyuning/MPOurWorldSpace/blob/master/assets/images/carousel/001.png?raw=true",
      title: "我们的太阳系",
      remark: "听专家为您解读我们的太阳系",
      url: "#",
    }, {
      image: "https://github.com/djyuning/MPOurWorldSpace/blob/master/assets/images/carousel/002.png?raw=true",
      title: "银河系探秘",
      remark: "听专家为您解读我们的太阳系",
      url: "#",
    }, {
      image: "https://github.com/djyuning/MPOurWorldSpace/blob/master/assets/images/carousel/003.png?raw=true",
      title: "那些为人类探索宇宙做出贡献的天文学家",
      remark: "听专家为您解读我们的太阳系",
      url: "#",
    }, {
      image: "https://github.com/djyuning/MPOurWorldSpace/blob/master/assets/images/carousel/004.png?raw=true",
      title: "月球的秘密",
      remark: "听专家为您解读我们的太阳系",
      url: "#",
    }, ],

    // 主轮播图尺寸
    carouselSize: Math.floor((wx.getSystemInfoSync().windowWidth - 40) * (368 / 672)) + 20,

    // 主轮播图选中索引
    carouselCurrent: 0,

    // 内容入口
    entries: [{
      id: "0001",
      cover: "https://github.com/djyuning/MPOurWorldSpace/blob/master/assets/entry/001.png?raw=true",
      name: "special",
      title: "专栏",
      remark: "领域知识，一网打尽",
      badge: 0,
    }, {
      id: "0002",
      cover: "https://github.com/djyuning/MPOurWorldSpace/blob/master/assets/entry/002.png?raw=true",
      name: "media",
      title: "视听",
      remark: "用耳朵倾听，用思维分析",
      badge: 45,
    }, {
      id: "0003",
      cover: "https://github.com/djyuning/MPOurWorldSpace/blob/master/assets/entry/003.png?raw=true",
      name: "scientist",
      title: "科学家",
      remark: "请铭记他们为人类科学探索做出的贡献",
      badge: 8,
    }, {
      id: "0004",
      cover: "https://github.com/djyuning/MPOurWorldSpace/blob/master/assets/entry/004.png?raw=true",
      name: "appreciate",
      title: "欣赏",
      remark: "慢慢欣赏来之不易的风景",
      badge: 99,
    }, {
      id: "0005",
      cover: "https://github.com/djyuning/MPOurWorldSpace/blob/master/assets/entry/005.png?raw=true",
      name: "read",
      title: "阅读",
      remark: "阅读使人进步",
      badge: 0,
    }],

  },

  // 轮播图切换时调整选中的条目索引
  carouselChange(e) {
    this.setData({
      carouselCurrent: e.detail.current,
    });
  },

  // 入口条目选择
  entryCheck(e) {
    let item = e.target.dataset.item;
    wx.navigateTo({
      url: `/pages/${item.name}/index`,
    });
  },

  // 跳转到搜索页面
  pushToSearch() {
    wx.navigateTo({
      url: "/pages/search/index",
    });
  },

  // 跳转到专栏页面
  pushToSpecial() {
    wx.navigateTo({
      url: "/pages/special/index",
    });
  },

});
