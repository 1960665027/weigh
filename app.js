//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
        
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            },
            fail:function()
            {
              wx.showModal({
                title: '警告',
                content: '若不授权头像，将看不到您的头像，点击授权即可使用，若不授权，后期还使用桂航课表，需在【发现】-【小程序】-删掉【桂航课表】，重新搜索使用。',
                cancelText:'不授权',
                confirmText:'授权',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    if (wx.openSetting) {
                      wx.openSetting({
                        success: (res) => {
                          res.authSetting = {
                            "scope.userInfo": true
                          }
                        }
                      })
                    } else {
                      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
                      wx.showModal({
                        title: '提示',
                        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
                      })
                    }
                      wx.openSetting({
                        success: (res) => {
                          res.authSetting = {
                            "scope.userInfo": true
                          }
                        }
                      })
                
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,

  }
})