Component({

  properties: {

    items: {
      type: Array,
      value: [],
    },

    current: {
      type: Number,
      value: 0,
      observer(newVal, oldVal, changedPath) {
        this.updateCurrent(newVal);
      }
    },

  },

  data: {
    currentIndex: 0,
    currentUse: '',
  },

  hasItems() {
    let items = this.getData('items');
    return Array.isArray(items) && items.length >= 1;
  },

  methods: {

    itemChange(e) {
      this.updateCurrent(e.target.dataset.index);
    },

    updateCurrent(index) {
      if (index === this.data.currentIndex) return;
      let _self = this;
      let query = this.createSelectorQuery();
      let item = this.data.items[index];

      let data = {
        currentUse: item,
        currentIndex: index,
      };

      this.setData(data);

      this.triggerEvent('onChange', data);

    },

  }

});
