// pages/kongjiao/kongjiao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  items:'',
  itemsrigth:[],
  curNav:0,
  zc: '',
  xq:'',
  xiaoqu:'',
  lou:'',
hidden: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let zc = parseInt(options.zs )+1
    let xq = parseInt(options.xq) + 1
    let xiaoqu = options.xiaoqu
    let lou = options.lou
    console.log(options)
    that.setData({
      zc: zc,
      xq: xq,
      xiaoqu: xiaoqu,
      lou: lou
    })
    if(zc == '')
    {
      wx.showModal({
        title: '警告',
        content: '请选择周次',
        confirmText: '确定',
        cancelText:'',
        success: function(res) {
          if (res.confirm)
          {
            wx.navigateBack({
              delta: 1,
            })
          }
        }

      })
    }else if(xq = '')
    {
      wx.showModal({
        title: '警告',
        content: '请选择学期',
        confirmText: '确定',
        cancelText: '',
        success: function (res) {
          if (res.confirm) {
            wx.navigateBack({
              delta: 1,
            })
          }
        }

      })
    }else if(xiaoqu == '')
    {
      wx.showModal({
        title: '警告',
        content: '请选择校区',
        confirmText: '确定',
        cancelText: '',
        success: function (res) {
          if (res.confirm) {
            wx.navigateBack({
              delta: 1,
            })
          }
        }

      })
    }else if(lou == '')
    {
      wx.showModal({
        title: '警告',
        content: '请选择教学楼',
        confirmText: '确定',
        cancelText: '',
        success: function (res) {
          if (res.confirm) {
            wx.navigateBack({
              delta: 1,
            })
          }
        }

      })
    }else{
    
   
  wx.request({
    url: 'https://www.glyac.com/jianzhi/index.php?a=getKJS',
    data: {
      campus: this.data.xiaoqu,
      building: this.data.lou,
      period: this.data.zc ,
      day: this.data.xq
    },

    success: function(res) {
      console.log(res.data);
      that.setData({
        items: res.data,  
        itemsrigth: res.data[0].emptyRooms,
        hidden: false
      })
    },
    fail: function(res) {
      wx.showToast({
        title: '你的网络好像出问题了',
        icon: 'success',
        duration: 1500
      })
    },
    complete: function(res) {},
  })
    }
  },
  switchRightTab:function(e)
  {
    let index = e.currentTarget.dataset.index
    this.setData({
      itemsrigth: this.data.items[index].emptyRooms,
      curNav: index
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
  onShareAppMessage: function () {
  
  }
})