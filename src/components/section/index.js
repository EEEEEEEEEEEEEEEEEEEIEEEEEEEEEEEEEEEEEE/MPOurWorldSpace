Component({

  properties: {

    // 图标
    icon: {
      type: String,
      value: '',
    },

    // 图标尺寸
    iconSize: {
      type: Number,
      value: 16,
    },

    // 图标颜色
    iconColor: {
      type: String,
      value: '#333',
    },

    // 分区标题
    title: {
      type: String,
      value: '',
    },

    // 分区副标题
    titleSub: {
      type: String,
      value: '',
    },

    // 显示更多按钮
    more: {
      type: Boolean,
      value: true,
    },

  },

  data: {

  },

  methods: {

    // 更多按钮点击
    onMoreTap(e) {
      this.triggerEvent('onMoreTap', e);
    },

  },

});
