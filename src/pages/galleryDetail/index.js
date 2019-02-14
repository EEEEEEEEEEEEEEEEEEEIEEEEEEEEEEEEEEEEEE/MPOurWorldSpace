Page({

  data: {
    gallery: {
      "id": 11,
      "title": "美不胜收的太阳系",
      "title_sub": "太阳系是地球所在的星系",
      "detail": "太阳系是以太阳为中心，和所有受到太阳的引力约束天体的集合体。包括八大行星（由离太阳从近到远的顺序：水星、金星、地球、火星、木星、土星、天王星、海王星 ）、以及至少173颗已知的卫星、5颗已经辨认出来的矮行星和数以亿计的太阳系小天体。",
      "cover": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550123342788&di=99fdb765af33bf316c96bfdcf8a7a8df&imgtype=0&src=http%3A%2F%2Fres.jnnews.tv%2Fa%2F10001%2F201902%2F75c4fdccb46d11056a08e85373ca756f.jpeg",
      "read_count": 14578,
      "like": 487522,
      "images": [
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550718120&di=05b218bf9fe8720ad80faa39c7178a3a&imgtype=jpg&er=1&src=http%3A%2F%2Fa1.att.hudong.com%2F22%2F59%2F05300001362413133289596059887.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550718213&di=2a586414b9fec23369e2ee9ab0307c9b&imgtype=jpg&er=1&src=http%3A%2F%2Fp0.ssl.qhimgs4.com%2Ft010bdf81aeb9632166.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550123551157&di=5e56b859af6fabb3b533e5b2664f1cab&imgtype=0&src=http%3A%2F%2Fm3.biz.itc.cn%2Fpic%2Fnew%2Fn%2F26%2F93%2FImg8419326_n.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550123566459&di=f14f24c28fc148e12b18743d2d7de871&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180804%2F6aa13c4c615f46b592e5d59952185860.jpeg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550123590313&di=a2b646774f1a765741341bd9da4f4774&imgtype=0&src=http%3A%2F%2Fwx4.sinaimg.cn%2Fmw690%2F504049fdgy1ftedr9qi4uj20gi0bojse.jpg',
        'https://t8.baidu.com/it/u=1975773106,3986367532&fm=191&app=48&size=h300&n=0&g=4n&f=JPEG?sec=1853310920&t=5bfd25ec8196be2d0d2ef55979d45a62',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550123646496&di=09b081c38c4d05695b8a63ae717b0b69&imgtype=0&src=http%3A%2F%2Fi4.qhimg.com%2Ft0109e52ecb926da337.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550718458&di=221cd8975c656fd9bec195c9828d2d37&imgtype=jpg&er=1&src=http%3A%2F%2Fp.cdn.sohu.com%2Fbc4e413e%2F06a2aa4a6b2f36bad545bda2e884f7f5.jpeg',
      ]
    },
  },

  imageChange(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: this.data.gallery.images,
      fail(error) {
        console.log(error);
      },
    });
  },

  onLoad: function (options) {
    console.log(options);
  },

})
