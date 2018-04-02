Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.request({
      url: 'https://www.glyac.com/jianzhi/index.php?a=banner',
      success: function(res) {
        that.setData({
          imgUrls:res.data
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  jwbindtap:function()
  {
    wx.navigateToMiniProgram({
      appId: 'wxb4995992ead5661f',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'release',
      success(res) {
        // 打开成功
        console.log(res)
      },fail(res){
        console.log(res)
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  goZhihiWeiList:function(e)
  {
    let userid = e.currentTarget.dataset.c_userid
    wx.navigateTo({
      url: '../newsxq/newsxq?uesrid='+userid,
    })
  }
})