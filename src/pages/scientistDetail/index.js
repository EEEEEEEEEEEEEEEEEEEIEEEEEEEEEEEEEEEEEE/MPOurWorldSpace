const WxParse = require('../../lib/wxParse/wxParse.js');

Page({

  data: {
    article: '',
  },

  onLoad: function (options) {
    // 富文本源码
    let article = '<p>祖冲之（429-500），字文远。出生于建康（今南京），祖籍范阳郡遒县（今河北涞水县），中国南北朝时期杰出的数学家、天文学家。</p><p>祖冲之一生钻研自然科学，其主要贡献在数学、天文历法和机械制造三方面。他在刘徽开创的探索圆周率的精确方法的基础上，首次将“圆周率”精算到小数第七位，即在3.1415926和3.1415927之间，他提出的“祖率”对数学的研究有重大贡献。直到16世纪，阿拉伯数学家阿尔·卡西才打破了这一纪录。</p><p>由他撰写的《大明历》是当时最科学最进步的历法，对后世的天文研究提供了正确的方法。其主要著作有《安边论》《缀术》《述异记》《历议》等。</p>';
    let that = this;
    WxParse.wxParse('summary', 'html', article, that);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})