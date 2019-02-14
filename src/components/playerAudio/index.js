let audio;

Component({

  properties: {

    item: {
      type: Object,
      value: null,
    },

  },

  data: {
    currentTime: 0, // 已播放时长
    duration: 0, //总时长
    progress: 0, // 播放进度
  },

  methods: {

    play() {
      audio.play();
    },

    pause() {
      audio.pause();
    },

    onTimeUpdate() {
      this.setData({
        currentTime: this._format(audio.currentTime),
      });
    },

    onCanplay() {
      this.setData({
        duration: this._format(audio.duration), //总时长
      });
    },

    _format(s) {
      s = parseInt(s);
      if (s === 0) return 0;
      
      let m = 0;
      let h = 0;
      if (s > 60) {
        m = parseInt(s / 60);
        s = parseInt(s % 60);
        if (m > 60) {
          h = parseInt(m / 60);
          m = parseInt(m % 60);
        }
      }

      h = ('0' + h).slice(-2);
      m = ('0' + m).slice(-2);
      s = ('0' + s).slice(-2);

      return `${h}:${m}:${s}`;
    },

  },

  ///////////////////////////////////////////////

  ready() {
    let item = this.data.item;

    // 创建内部 audio 上下文 InnerAudioContext 对象。
    audio = wx.getBackgroundAudioManager();

    // 设置音频信息
    audio.title = item.title;
    audio.src = item.src;
    audio.coverImgUrl = item.cover;
    audio.onCanplay(() => {
      this.onCanplay();
    });
    audio.onTimeUpdate(() => {
      this.onTimeUpdate();
    });
  },

})
