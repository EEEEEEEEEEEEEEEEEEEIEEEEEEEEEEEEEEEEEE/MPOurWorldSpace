Component({
  
  properties: {

    // 按钮文本
    text: {
      type: String,
      value: '查看更多',
    },

    // 按钮文本
    loadingText: {
      type: String,
      value: '加载中 ···',
    },

    // 按钮文本
    disabledText: {
      type: String,
      value: '没有更多了',
    },

    // 是否正在加载
    loading: {
      type: Boolean,
      value: false,
    },

    // 禁用
    disabled: {
      type: Boolean,
      value: false,
    },

  },
  
})
