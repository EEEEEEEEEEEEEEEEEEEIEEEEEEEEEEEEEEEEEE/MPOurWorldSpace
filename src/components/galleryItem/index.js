Component({

  properties: {

    item: {
      type: Object,
      value: null,
    },

  },

  methods: {

    tapChange(e) {
      let item = this.data.item;
      wx.navigateTo({
        url: `/pages/galleryDetail/index?id=${item.id}`,
      });
    }

  },

})
