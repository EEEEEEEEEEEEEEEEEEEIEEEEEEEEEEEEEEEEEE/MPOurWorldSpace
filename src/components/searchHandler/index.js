Component({

  properties: {

    // 占位字符
    placeholder: {
      type: String,
      value: '输入关键字',
    },

    // 输出值
    value: {
      type: String,
      value: '',
    },

    // 是否为输入表单
    input: {
      type: Boolean,
      value: true,
    },

  },

  methods: {

    // 输入时执行的事件
    onInput(e) {
      this.triggerEvent('input', e.detail);
    },

  },

});
