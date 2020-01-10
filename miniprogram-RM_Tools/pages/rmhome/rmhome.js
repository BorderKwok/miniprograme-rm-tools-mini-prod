// pages/rmhome/rmhome.js
var homeConfigs=require('../data/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    configs: homeConfigs.data,
    role:"1",
    checkbox:false,
    prospectCount:0,
    pageInfo:{
      slidebutton1: "",
      listradio: true,
      warning: false,
      alert: false
    },
    filterItemStyle:{
      item1:"item-active",
      item2:"",
      item3:""
    },
    isFocus:0,
    activeNum:'',
    closedNum:'',
    coldNum:'',
    activeList:[],
    closedList:[],
    coldList:[],
    rmList:[],
    inputValue: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app = getApp();
    let _this = this;
    const role = "1" //getApp().globalData['role'];
    let pageInfo = {
    }
    // app.getFont();
    wx.getSystemInfo({
      success: function(res) {
        let clientHeight = res.windowHeight;
        let pxToRpxScale = 750 / res.windowWidth;
        // 状态栏的高度
        let ktxStatusHeight = res.statusBarHeight;
        // 导航栏的高度
        let navigationHeight = 44 ;
        // window的宽度
        let ktxWindowWidth = res.windowWidth;
        // window的高度
        let ktxWindowHeight = res.windowHeight;
        // 屏幕的高度
        let ktxScreentHeight = res.screenHeight;
        // 底部tabBar的高度
        let tabBarHeight = ktxScreentHeight - ktxStatusHeight - navigationHeight - ktxWindowHeight;
        _this.setData({
          height: clientHeight,
          tabbarheight: tabBarHeight
        });
      },
    })
    getApp().getNls(_this,function(){
      if(role == '2'){
        pageInfo['slidebutton1'] = _this.data.nls.rmhome.panel.sector;
        pageInfo['slidebutton2'] = _this.data.nls.rmhome.panel.briefing;
      } else {
        pageInfo['slidebutton1'] = _this.data.nls.rmhome.panel.tasks;
        pageInfo['slidebutton2'] = _this.data.nls.rmhome.panel.reports
      }
      _this.setData({
        role: role,//
        pageInfo: pageInfo
      });
    });
    // 请求activeList接口
    wx.request({
      url: app.globalData.url + 'demo/prospect/getTest/avtive', //仅为示例，并非真实的接口地址
      data: {},
      success: function (res) {
        var myDate = new Date().getDate();
        var myMonth = new Date().getMonth() + 1;
        var list = res.data.Prospects;
        for(var i=0; i<list.length; i++){
          let dueDate = list[i]['DueDate'];
          let day = dueDate.split('-')[2];
          let monthNum = dueDate.split('-')[1];
          let month = _this.data.configs[dueDate.split('-')[1]];
          list[i]['DueDate'] = day +' '+ month; 
          if ( myMonth < monthNum) {
            list[i]['warning'] = 0;
          }
          if ( myMonth > monthNum) {
            list[i]['warning'] = 1;
          }
          if ( myMonth == monthNum) {
            if (myDate > day) {
              list[i]['warning'] = 1;
            } else {
              list[i]['warning'] = 0;
            }
          }
        }
        _this.setData({
          activeList:list,
          rmList: list,
          activeNum: list.length
        })
        console.log(list);
      }
    }),
    // 请求closedList接口
    wx.request({
      url: app.globalData.url + 'demo/prospect/getTest/closed', //仅为示例，并非真实的接口地址
      data: {},
      success: function (res) {
        var myDate = new Date().getDate();
        var myMonth = new Date().getMonth() + 1;
        var list = res.data.Prospects;
        for (var i = 0; i < list.length; i++) {
          let dueDate = list[i]['DueDate'];
          let day = dueDate.split('-')[2];
          let monthNum = dueDate.split('-')[1];
          let month = _this.data.configs[dueDate.split('-')[1]];
          list[i]['DueDate'] = day + ' ' + month;
          // if ( myMonth < monthNum ){
          //   list[i]['warning'] = 0;
          // }
          // if ( myMonth > monthNum ){
          //   list[i]['warning'] = 1;
          // }
          // if ( myMonth == monthNum ){
          //   if( myDate > day ){
          //     list[i]['warning'] = 1;
          //   }else{
          //     list[i]['warning'] = 0;
          //   }
          // }
        }
        _this.setData({
          closedList: list,
          closedNum: list.length
        })
      }
    }),
    // 请求coldList接口
    wx.request({
      url: app.globalData.url + 'demo/prospect/getTest/cold', //仅为示例，并非真实的接口地址
      data: {},
      success: function (res) {
        var myDate = new Date().getDate();
        var myMonth = new Date().getMonth() + 1;
        var list = res.data.Prospects;
        for (var i = 0; i < list.length; i++) {
          let dueDate = list[i]['DueDate'];
          let day = dueDate.split('-')[2];
          let monthNum = dueDate.split('-')[1];
          let month = _this.data.configs[dueDate.split('-')[1]];
          list[i]['DueDate'] = day + ' ' + month;
          // if (myMonth < monthNum) {
          //   list[i]['warning'] = 0;
          // }
          // if (myMonth > monthNum) {
          //   list[i]['warning'] = 1;
          // }
          // if (myMonth == monthNum) {
          //   if (myDate > day) {
          //     list[i]['warning'] = 1;
          //   } else {
          //     list[i]['warning'] = 0;
          //   }
          // }
        }
        _this.setData({
          coldList: list,
          coldNum: list.length
        })
      }
    })
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
  },
  filterActions(event){
    let _this=this;
    let itemId = event.currentTarget.dataset.items;
    switch(itemId){
      case '1':
        _this.setData({
          filterItemStyle: {
            item1: 'item-active',
            item2: '',
            item3: ''
          },
          rmList: _this.data.activeList
        })
        break;
      case '2':
        _this.setData({
          filterItemStyle: {
            item1: '',
            item2: 'item-active',
            item3: ''
          },
          rmList: _this.data.closedList
        })
        break;
      case '3':
        _this.setData({
          filterItemStyle: {
            item1: '',
            item2: '',
            item3: 'item-active'
          },
          rmList: _this.data.coldList
        })
        break;
        default:
        _this.setData({
          filterItemStyle: {
            item1: 'item-active',
            item2: '',
            item3: '',
          },
          rmList: _this.data.activeList
        })
    }
  },
  showCostDetailFun() {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: "linear",
      delay: 0
    })
    animation.translateY(-this.data.height-this.data.tabbarheight+10).step()
    this.setData({
      animationData: animation.export(),
      showCostDetail: true,
      show:true
    })
    wx.hideTabBar({
      aniamtion: false,
      success: function () {
        console.log('tabbar hidden');
      }
    })
  },
  hideCostDetailFun() {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    animation.translateY(600).step()
    this.setData({
      animationData: animation.export(),
    })
    wx.showTabBar({
      aniamtion:false,
      success:function(){
        console.log('tabbar show');
      }
    })
  },
  prospectcheckbox(e){
    let prospectCount = e.detail.value.length;
    this.setData({
      pageInfo: {
        listradio: true,
        warning: true
      },
      prospectCount: prospectCount
    })
  },
  bulkrefer(){
    this.setData({
      checkbox:false,
      pageInfo:{
        listradio:true
      }
    })
    wx.hideTabBar({
      aniamtion:false,
      success:function(){
        console.log('tabbar hidden');
      }
    })
  },
  closeBulkrefer(){
    let alert = true;
    if(this.data.prospectCount == 0){
      alert = false;
    }
    this.setData({
      pageInfo: {
        listradio: false,
        warning: this.data.pageInfo.warning,
        alert: alert
      }
    })
    wx.showTabBar({
      aniamtion: false,
      success: function () {
        console.log('tabbar show');
      }
    })
  },
  discard(){
    this.setData({
      pageInfo: {
        listradio: false,
        warning: false,
        alert: false
      }
    })
    wx.showTabBar({
      aniamtion: false,
      success: function () {
        console.log('tabbar show');
      }
    })
  },
  back(){
    this.setData({
      pageInfo: {
        listradio: true,
        warning: this.data.pageInfo.warning,
        alert: false
      }
    })
  },
  clear(){
    this.setData({
      prospectCount: 0,
      checkbox:false,
      pageInfo:{
        listradio: true,
        warning: false,
        alert: false
      }
    })
  },
  prospectChange(){
    console.log('prospectChange');
  },
  ifFocus: function () {
    var that = this;
    that.setData({
      isFocus: 1
    })
  },
  ifBlur: function () {
    var that = this;
    that.setData({
      isFocus: 0
    })
  },
  goDetail(e) {
    let tIndex = e.currentTarget.dataset.index;
    let that = this;
    let tid = that.data.rmList[tIndex].ID;
    wx.navigateTo({
      url: '../prospectDetail/prospectDetail?tid='+tid
      // url: '../prospectDetail/prospectDetail'
    })
  },
  clearInputEvent: function (res) {
    this.setData({
      'inputValue': ''
    })
  }
})