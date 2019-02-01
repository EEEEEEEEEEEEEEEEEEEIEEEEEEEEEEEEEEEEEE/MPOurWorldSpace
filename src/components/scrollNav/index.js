// components/scrollNav/index.js
Component({

  properties: {

    items: {
      type: Array,
      value: [],
    },

  },

  data: {
    current: 0,
  },

  hasItems() {
    let items = this.getData('items');
    return Array.isArray(items) && items.length >= 1;
  },

  methods: {

    itemChange(e) {
      this.setData({
        current: e.target.dataset.id,
      });
    },

  }

});
