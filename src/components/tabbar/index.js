Component({

  properties: {

    // 高亮条目
    selected: {
      type: Number,
      value: 0,
    },

    // 是否显示边框
    border: {
      type: Boolean,
      value: false,
    },

  },

  // 组件关系定义
  relations: {

    '../tabbarItem/index': {
      type: 'child',
    },

  },

});
