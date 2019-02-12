Component({

  properties: {

    items: {
      type: Array,
      value: [],
    },

  },

  data: {
    currentIndex: 0,
    current: '',
  },

  hasItems() {
    let items = this.getData('items');
    return Array.isArray(items) && items.length >= 1;
  },

  methods: {

    itemChange(e) {
      let data = {
        current: e.target.dataset.item,
        currentIndex: e.target.dataset.index,
      };

      // 更新数据
      this.setData(data);

      // 事件回调
      this.triggerEvent('onChange', data);

    },

  }

});
