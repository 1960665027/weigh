var app = getApp();
Page({
  data: {
    userInfo: {},

    
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    //调用应用实例的方法获取全局数据

    app.getUserInfo(function (userInfo) {
      //更新数据
      console.log(userInfo)
      that.setData({
        userInfo: userInfo
      })
    })
    wx.showToast({
      title: '加载成功',
      icon: 'success',
      duration: 1500
    })


  },
  zhuxiao:function(e)
  {
    try {
      wx.removeStorageSync('userName');
      wx.removeStorageSync('passWord');
    } catch (e) {
      
    }
    wx.redirectTo({
      url: '../login/login',
    })
  }
  ,
  onShareAppMessage: function () {

  },

  onPullDownRefresh: function () {  //上拉刷新 在home.josn中开启;
    var that = this
    //调用应用实例的方法获取全局数据

    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    wx.showToast({
      title: '加载成功',
      icon: 'success',
      duration: 1500
    })
    wx.stopPullDownRefresh()
  },
  bindtapimg: function (e) {
    console.log(e)
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: ['https://www.glyac.com/photo/pay.jpg'] // 需要预览的图片http链接列表
    })
  },
})