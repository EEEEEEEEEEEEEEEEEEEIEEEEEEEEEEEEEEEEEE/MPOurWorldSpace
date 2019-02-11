// 是否需要暂停页面更新
let pushed = false;

Component({

  data: {
    
  },

  methods: {

    //////////////////////////////////////////////

    // 开始事件
    viewStart() {
      if (!pushed) return;
      pushed = false;
    },

    // 暂停事件
    viewPush() {
      if (pushed) return;
      pushed = true;
    },

  }
})