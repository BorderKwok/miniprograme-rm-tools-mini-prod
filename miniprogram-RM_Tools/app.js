//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    url:'https://www.farben.club:12880/',
    openId:''
  },
  languageSwitch: function (language, fun) {
    wx.setStorage({
      key: 'local',
      data: language,
      success: function (res) {
        if (typeof fun === 'function') {
          fun();
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  getNls:function(_this,...args){
    wx.getStorage({
      key: 'local',
      success: function (res) {
        if(!res.data){
          res.data='en';
        }
        let nlsConfig = require('./pages/NLS/nls_' + res.data + '.js')
        _this.setData({ nls: nlsConfig.nls });
        if(typeof args[0] === 'function'){
          args[0]();
        }
      },
      fail: function (res) {
        let nlsConfig = require('./pages/NLS/nls_en.js')
        _this.setData({ nls: nlsConfig.nls });
      }
    })
  },
  getFont:function(){
    wx.loadFontFace({
      family: 'PingFang SC',
      source: 'url("https://www.farben.club:12880/demo/font/PingFangHK-Medium.otf")',
      success: console.log
    })
    wx.loadFontFace({
      family: "SF Pro Regular",
      source: 'url("https://www.farben.club:12880/demo/font/sf-pro-text_regular.ttf")',
      success: console.log
    })
    wx.loadFontFace({
      family: "SF Pro Medium",
      source: 'url("https://www.farben.club:12880/demo/font/sf-pro-text_medium.woff.ttf")',
      success: console.log
    })
    wx.loadFontFace({
      family: "SF Pro Light",
      source: 'url("https://www.farben.club:12880/demo/font/sf-pro-text_light.woff.ttf")',
      success: console.log
    })
    wx.loadFontFace({
      family: "Hsbc Light",
      source: 'url("https://www.farben.club:12880/demo/font/UniversNextforHSBC-Light.otf")',
      success: console.log
    })
    wx.loadFontFace({
      family: "Hsbc Regular",
      source: 'url("https://www.farben.club:12880/demo/font/UniversNextforHSBC-Regular.otf")',
      success: console.log
    })
  }
})