Component({

  properties: {

    // 标题
    title: {
      type: String,
      value: '',
    },

    // 默认图标
    icon: {
      type: String,
      value: '',
    },

    // 主题，支持蓝色、红色、绿色、黑色、橙色、湖蓝色
    theme: {
      type: String,
      value: '',
    },

    // 高亮图标
    iconSelected: {
      type: String,
      value: '',
    },

    // 是否选中
    selected: {
      type: Boolean,
      value: false,
    },

  },

  relations: {

    '../tabbar/index': {
      type: 'parent',
    },

  },

});
