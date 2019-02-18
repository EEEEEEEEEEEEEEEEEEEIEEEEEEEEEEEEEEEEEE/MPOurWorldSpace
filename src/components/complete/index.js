Component({

  properties: {

    // 类型，支持 default、success、error、warning、info
    type: {
      type: String,
      value: 'default',
    },

    // 图标
    icon: {
      type: String,
      value: '',
    },

    // 标题
    title: {
      type: String,
      value: '',
    },

    // 备注信息
    remark: {
      type: String,
      value: '',
    },

  },

});
