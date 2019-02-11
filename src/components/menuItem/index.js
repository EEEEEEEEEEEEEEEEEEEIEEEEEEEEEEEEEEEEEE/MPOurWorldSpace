Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  properties: {
    // 图标
    icon: {
      type: String,
      value: ""
    },

    // 图标颜色
    color: {
      type: String,
      value: "#666"
    },

    // 标题
    title: {
      type: String,
      value: ""
    },

    // 备注
    remark: {
      type: String,
      value: ""
    }
  }
});
