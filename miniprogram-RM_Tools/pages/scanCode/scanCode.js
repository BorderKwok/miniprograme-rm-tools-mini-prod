// pages/test/test.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    otp: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;

    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res.result);
        that.setData({
          otp: res.result
        })

        wx.request({
          url: 'https://cmb.wechat.hsbcnet.com/weconnect-front/v1/person/wechat/login',
          method: 'post',
          header: {
            'MessageIdentification': that.getMessageId()
          },
          data: { 'oneTimePassword': that.data.otp, 'openId': decodeURIComponent(app.globalData.openId) },
          success: function (res) {
            console.log(res);
            if (res.data.code == 200) {
              wx.reLaunch({
                url: '../index/index',
                success: function (e) {
                  console.log('90090009');
                  var page = getCurrentPages().pop();

                  page.onLoad();
                }
              })
            } else {
              wx.showToast({
                title: 'fail',
                icon: 'none',
                duration: 2000,
                complete: function () {
                  wx.reLaunch({
                    url: '../index/index'
                  })
                }
              })
            }
          },
          fail: function () {
            wx.reLaunch({
              url: '../index/index'
            })
          }
        })
      },
      fail: function () {
        wx.reLaunch({
          url: '../index/index'
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
    wx.hideHomeButton({});
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