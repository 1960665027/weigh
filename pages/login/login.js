// pages/login/login.js
Page({
  data: {
    userName: "",
    passWord: ""
  },
  onLoad: function (e) {
    try {
      var userName = wx.getStorageSync('userName')
      var passWord = wx.getStorageSync('passWord')
      this.setData({
        userName: userName,
        passWord: passWord
      })
    } catch (e) {
      // Do something when catch error
    }

  },
  formSubmit: function (e) {
    var objUse = e.detail.value;
    if (objUse.userName == 0 || objUse.passWord == 0) {
      wx.showToast({
        title: '学号或密码不能为空',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)

    } else if (objUse.userName.length != 13) {
      wx.showToast({
        title: '请输入13位学号',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (objUse.passWord.length < 6 || objUse.passWord.length > 20) {
      wx.showToast({
        title: '请输入6-20密码',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else {
      wx.showToast({
        title: '正在登录',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
      wx.request({
        url: 'https://www.glyac.com/jianzhi/index.php?a=getCj',

        data: {
          b_y: 2015,
          t_m: 0,
          s_n: objUse.userName,
          p_d: objUse.passWord
        },
        success: function (e) {

          console.log(e);
          if (e.data.errorCode == 102) {
            wx.showToast({
              title: '账号或密码有误',
              icon: 'loading',
              duration: 1500
            })
            setTimeout(function () {
              wx.hideToast()
            }, 2000)
          } else {
            console.log("haha");
            wx.setStorageSync("userName", objUse.userName);
            wx.setStorageSync("passWord", objUse.passWord);
            wx.redirectTo({
              url: '../jw/jw?userId=' + objUse.userName + "&passWord=" + objUse.passWord,
            })
          }
        },
        fail:function(res)
        {
          wx.showToast({
            title: '你的网络好像出问题了',
            icon: 'success',
            duration: 1500
          })

        }
      })
    }
  }

})