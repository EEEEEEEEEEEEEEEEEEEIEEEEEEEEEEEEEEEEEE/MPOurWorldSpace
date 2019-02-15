Component({

  properties: {

    item: {
      type: Object,
      value: null,
    },

  },

  data: {
    playing: false, // 是否正在播放
    currentTime: 0, // 已播放时长
    duration: 0, //总时长
    progress: 0, // 播放进度
  },

})
