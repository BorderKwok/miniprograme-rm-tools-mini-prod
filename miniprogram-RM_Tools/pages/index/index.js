let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    path: '',
    code: '',
    url: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.hideTabBar({});
    let that = this;
    that.setData({
      url: ''
    });
    if (options != undefined && options.weburl != undefined) {
      that.setData({
        path: options.weburl,
      })
    }
    wx.login({
      success: function (res) {
        console.log(res);
        that.setData({
          code: res.code
        })
        wx.request({
          url: 'https://cmb.wechat.hsbcnet.com/weconnect-front/v1/person/wechat/' + that.data.code,
          method: 'post',
          header: {
            'MessageIdentification': that.getMessageId()
          },
          data: {},
          success: function (res) {
            console.log(res);
            if (res.data.code == 200) {
              let tips = '';
              let taps = '';
              app.globalData.openId = res.data.data.openId;
              if (res.data.data.token && res.data.data.token != null && res.data.data.token != undefined) {
                let takes = res.data.data.token;
                tips = takes.substring(0, takes.length / 2);
                taps = takes.substring((takes.length / 2));
              }
              that.setData({
                url: 'https://cmb.wechat.hsbcnet.com/weconnect-front/dist/miniprograms-rm-tools/index.html#/' + that.data.path + '?login=' + res.data.data.login + '&tag=' + res.data.data.openId + '&tips=' + tips + '&taps=' + taps + '&isManager=' + res.data.data.isManager + '&internalRole=' + res.data.data.internalRole + '&error=200'
              })
              console.log(that.data.url);
            } else {
              that.setData({
                url: 'https://cmb.wechat.hsbcnet.com/weconnect-front/dist/miniprograms-rm-tools/index.html#/' + that.data.path + '?login=false&tag=&tips=&taps=&isManager=&internalRole=&error=' + res.data.code
              })
            }
          }
        })
      }
    })
  },
  getMessageId() {
    return (this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4());
  },
  S4() {
    return (((1 + Math.random()) * 0X10000) | 0).toString(16).substr(1);
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'WeConnect',
      path: '/pages/index/index',
      imageUrl: '/pictures/share.jpg'
    }
  }
})