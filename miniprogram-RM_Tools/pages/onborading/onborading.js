// pages/onborading/onborading.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      './img/img_onboarding_1.png',
      './img/img_onboarding_2.png',
      './img/img_onboarding_3.png',
      './img/img_onboarding_4.png'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 100,
    msg: {
      title: "Task Management for prospects",
      title1: "Submit your prospect status any places, any time",
      btn: false,
      skip: true
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app = getApp();
    app.getFont();
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

  },
  // start(e){
  //   app.languageSwitch(e.target.id);
  //   wx.switchTab({
  //     url: '../rmhome/rmhome',
  //   })
  // },
  // eventChange(e){
  //   var _this=this;
  //   switch (e.detail.current) {
  //     case 0:
  //       _this.setData({
  //         msg: {
  //           title: "Task Management for prospects",
  //           title1: "Submit your prospect status any places, any time",
  //           btn: false,
  //           skip:true
  //         }
  //       })
  //       console.log(_this.data.msg);
  //       break;
  //     case 1:
  //       _this.setData( {
  //         msg:{
  //           title: "View details for prospects",
  //           title1: "Know your prospects more and deeper",
  //           btn: false,
  //           skip: true
  //         }
  //       })
  //       console.log(_this.data.msg);
  //       break;
  //     case 2:
  //       _this.setData({
  //         msg:{
  //           title: "Add a prospect",
  //           title1: "Start your new business.",
  //           btn: false,
  //           skip: true
  //         }
  //       })
  //       console.log(_this.data.msg);
  //       break;
  //     case 3:
  //       _this.setData({
  //         msg:{
  //           title: "Urgent notification",
  //           title1: "Get the first-hand news",
  //           btn: true,
  //           skip: false
  //         }
  //       })
  //       console.log(_this.data.msg);
  //       break;
  //   }
  // }
})