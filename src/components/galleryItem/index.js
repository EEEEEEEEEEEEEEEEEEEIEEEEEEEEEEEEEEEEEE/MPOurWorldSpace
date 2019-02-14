Component({

  properties: {

    item: {
      type: Object,
      value: null,
    },

  },

  methods: {

    tapChange(e) {
      let gallery = this.data.item;
      wx.navigateTo({
        url: `/pages/galleryDetail/index?id=${gallery.id}`,
      });
    }

  },

})
