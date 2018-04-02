
Page({
  data: {
    arr: [],
    keyzhi: 0,
    userId: '',
    passWord: '',

    array: [
      {

        "name": '2015-2016学年第一学期',
        "value": "2015,1"

      },
      {

        "name": '2015-2016学年第二学期',
        "value": "2015,0"
      },
      {

        "name": '2016-2017学年第一学期',
        "value": "2016,1"
      },
      {

        "name": '2016-2017学年第二学期',
        "value": "2016,0"
      }
    ],
  },
  onLoad: function (e) {
    console.log(e.userId);
    this.setData({
      userId: e.userId,
      passWord: e.passWord
    })
  },
  bindPickerChange: function (e) {
    
    var that = this;
    that.setData({
      keyzhi: e.detail.value
    })


    var userName = this.data.userId
    var passWord = this.data.passWord
    let zhi = this.data.array[e.detail.value].value
    var strs = new Array();
    strs = zhi.split(",");
    let b_y = strs[0];
    let t_m = strs[1];
    console.log("yide", strs);

    
    wx.request({
      url: 'https://www.glyac.com/jianzhi/index.php?a=getCj',

      data: {
        b_y: b_y,
        t_m: t_m,
        s_n: userName,
        p_d: passWord
      },
      success: function (e) {
        console.log(e);
        if (e.data.errorCode == 0)
        {
        that.setData({
          arr: e.data.scoreList
        })
        wx.showToast({
          title: '加载成功',
          icon: 'loading',
          duration: 1500
        })
        setTimeout(function () {
          wx.hideToast()
        }, 2000)
        } else if (e.data.errorCode == 113)
        {
          wx.showToast({
            title: '成绩未公布',
            icon: 'loading',
            duration: 1500
          })
          setTimeout(function () {
            wx.hideToast()
          }, 2000)
        }
      }, fail: function (res) {
        wx.showToast({
          title: '获取数据失败',
          icon: 'loading',
          duration: 1500
        })
        setTimeout(function () {
          wx.hideToast()
        }, 2000)
      }
    })







  },
  onShareAppMessage: function () {

  }

})