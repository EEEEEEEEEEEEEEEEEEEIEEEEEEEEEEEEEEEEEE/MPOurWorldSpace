// 获取应用实例
const app = getApp();

// 分类
const categories = {};

Page({

  data: {
    current: 0,
    contentSize: wx.getSystemInfoSync().windowHeight - 40,
    categories: ['专题', '科学家', '媒体', '书籍', '相册', ],
    explores: [{
      "id": 12,
      "title": "神秘宇宙",
      "remark": "探秘神奇宇宙",
      "popularity": 345680,
      "url": "/pages/specialDetail/index?id=1024",
      "cover": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550138895945&di=b6dddad7389bd5fb6fa3c8dcd02396b7&imgtype=0&src=http%3A%2F%2Fimg02.tooopen.com%2Fimages%2F20140911%2Fsy_70454915439.jpg"
    },
    {
      "id": 12,
      "title": "生物多样性",
      "remark": "探秘神奇宇宙",
      "popularity": 345680,
      "url": "/pages/specialDetail/index?id=1024",
      "cover": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550139199797&di=a134e74d4e2237254945de8eae41405e&imgtype=0&src=http%3A%2F%2Fpic15.photophoto.cn%2F20100408%2F0035035225706280_b.jpg"
    },],
  },

  swiperChange(e) {
    this.setData({
      current: e.detail.current,
    });
  },

  categoryChange(e) {
    this.setData({
      current: e.detail.currentIndex,
    });
  },

  onLoad: function (options) {},

})
