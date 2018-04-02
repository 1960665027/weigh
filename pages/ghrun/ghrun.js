var app = getApp();
Page({
  data: {
    session_key: '',
    datearr: '',
    bushuarr: '',
    code: '',
    iv: '',
    encryptedData: '',
    userInfo:null,
    show:1,
    step:'',
    data_step:'',
    xiabiao:'',
    nickName:'',
    diyiming:'',
    step_sum:'',
    data_stepmonth:'',
    avatarUrl:''
  }
  ,showToday:function(){
    this.setData({
      show:1,
      off:0
    })

  },
  showMonth:function(){
    this.setData({
      show:0,
      off:1
    })
  }

  ,
  onLoad: function () {
    var that = this
    app.getUserInfo(function (userInfo) {
      //更新数据
      console.log(userInfo)
      that.setData({
        userInfo: userInfo,
        nickName:userInfo.nickName,
        avatarUrl: userInfo.avatarUrl
      })
      //post上传数据到数据库
      wx.request({
        url: 'https://www.glyac.com/jianzhi/index.php?a=user_gh',
        data: {
          avatarUrl : userInfo.avatarUrl,
          city: userInfo.city,
          country: userInfo.country,
          gender: userInfo.gender,
          language: userInfo.language,
          nickName: userInfo.nickName,
          province: userInfo.province,
        },
        success: function(res) {
         
        },
        fail: function(res) {},
        complete: function(res) {},
      })

    })
    //登录获取code
    wx.login({
      success: function (res) {
        let code = res.code
        console.log("code", code)
        that.setData({
          code: code
        })
      }
    })
   //运动
    if (wx.getWeRunData)
   {
      console.log('run')
    wx.getWeRunData({
      success: function (res) {
        console.log('run', res)
        that.setData({ encryptedData: res.encryptedData })
        that.setData({ iv: res.iv })
        
        that.getSession();
        //实时步数
        wx.request({
          url: 'https://www.glyac.com/jianzhi/index.php?a=getStepday',
          success: function (res) {
            that.setData({
              data_step: res.data
            })
            //循环json
            for (var i = 0; i < res.data.length; i++) {
              //判断名字不能为空
              if (res.data[i] != null && that.data.nickName != null) {
                //判断是否本人
                if (that.data.nickName == res.data[i].uid) {
                  that.setData({
                    xiabiao:i
                  })
                }
                //判断当天第一名
                if(i==1)
                {
                  that.setData({
                    diyiming:res.data[i]
                  })
                  
                }
                
              }
            }
            wx.showToast({
              title: '加载成功',
              icon: 'success',
              duration: 1500
            })
          },
          fail: function (res) { },
          complete: function (res) { },
        }),
         //月实时步数
          wx.request({
            url: 'https://www.glyac.com/jianzhi/index.php?a=getStepdayMonth',
            success: function (res) {
              that.setData({
                data_stepmonth: res.data
              })
              //循环json
              for (var i = 0; i < res.data.length; i++) {
                //判断名字不能为空
                if (res.data[i] != null && that.data.nickName != null) {
                  //判断是否本人
                  if (that.data.nickName == res.data[i].uid) {
                    that.setData({
                      xiabiaomonth: i
                    })
                  }
                  //判断当天第一名
                  if (i == 1) {
                    that.setData({
                      diyimingmonth: res.data[i]
                    })

                  }

                }
              }
              wx.showToast({
                title: '加载成功',
                icon: 'success',
                duration: 1500
              })
            },
            fail: function (res) { },
            complete: function (res) { },
          })
      },
      fail: function (res) {
        console.log('fali',res)
        // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
        wx.showModal({
          title: '提示',
          content: '抱歉，无法通过你的设备获取到微信运动的数据。'
        })
       },
      complete: function (res) { },
    })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
    
  },
  //时间戳转换时间  
  toDate: function (number) {
    var n = number * 1000;
    var date = new Date(n);
    var Y = date.getFullYear() + '/';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return (Y + M + D)
  },
  getSession: function () {
    let that = this
    console.log('codes', that.data.code);
    wx.request({
      url: 'https://www.glyac.com/wxmysql/index.php?a=login',
      data: {
        code: that.data.code
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('dd', res.data.session_key);
        that.setData({
          session_key: res.data.session_key
        })
        wx.setStorageSync('sessionId', res.data.session_key)
        that. decodeUserInfo();
      }

    })

  },
  decodeUserInfo: function () {
    let that = this
    console.log('a',that.data.encryptedData);
    console.log('b',that.data.iv);
    console.log('c',wx.getStorageSync('sessionId'));
    wx.request({
      url: 'https://www.glyac.com/jianzhi/index.php?a=getRun',
      data: {
        encryptedData: that.data.encryptedData,
        iv: that.data.iv,
        sessionKey: wx.getStorageSync('sessionId')
      },
      method: 'GET',
      success: function (res) {

        console.log('dds', res);
        let todayStep = res.data.stepInfoList.pop()
        var sum = 0;
        for(var i = 0;i<res.data.stepInfoList.length;i++)
        {
          
          sum += parseInt(res.data.stepInfoList[i].step);
          
        }
        console.log('sum', sum + todayStep.step)
        console.log(that.data.nickName)
        console.log(res.data.stepInfoList)
        console.log(todayStep.step)
        that.setData({
          step: todayStep.step,
          step_sum: sum + todayStep.step
        })
        console.log(that.data.avatarUrl)
        //更新实时数据
      wx.request({
        url: 'https://www.glyac.com/jianzhi/index.php?a=step_gh',
        data: {
          uid: that.data.nickName,
          date: todayStep.timestamp,
          value: todayStep.step,
          avatarUrl: that.data.avatarUrl
        },
        success: function(res) {

        },
        fail: function(res) {},
        complete: function(res) {},
      })
      //月更新实时数据
      wx.request({
        url: 'https://www.glyac.com/jianzhi/index.php?a=stepmonth_gh',
        data: {
          uid: that.data.nickName,
          date: todayStep.timestamp,
          value: sum + todayStep.step,
          avatarUrl:that.data.avatarUrl
        },
        success: function (res) {

        },
        fail: function (res) { },
        complete: function (res) { },
      })
      
      },fail:function(res)
      {
        console.log('fail',res);
      }
    })
  },
  onPullDownRefresh:function()
  {
    var that =this
    //实时步数
    wx.request({
      url: 'https://www.glyac.com/jianzhi/index.php?a=getStepday',
      success: function (res) {
        that.setData({
          data_step: res.data
        })
        //循环json
        for (var i = 0; i < res.data.length; i++) {
          //判断名字不能为空
          if (res.data[i] != null && that.data.nickName != null) {
            //判断是否本人
            if (that.data.nickName == res.data[i].uid) {
              that.setData({
                xiabiao: i
              })
            }
            //判断当天第一名
            if (i == 1) {
              that.setData({
                diyiming: res.data[i]
              })

            }

          }
        }
        wx.showToast({
          title: '加载成功',
          icon: 'success',
          duration: 1500
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
      ,
      //月实时步数
      wx.request({
        url: 'https://www.glyac.com/jianzhi/index.php?a=getStepdayMonth',
        success: function (res) {
          that.setData({
            data_stepmonth: res.data
          })
          //循环json
          for (var i = 0; i < res.data.length; i++) {
            //判断名字不能为空
            if (res.data[i] != null && that.data.nickName != null) {
              //判断是否本人
              if (that.data.nickName == res.data[i].uid) {
                that.setData({
                  xiabiaomonth: i
                })
              }
              //判断当天第一名
              if (i == 1) {
                that.setData({
                  diyimingmonth: res.data[i]
                })

              }

            }
          }
          wx.showToast({
            title: '加载成功',
            icon: 'success',
            duration: 1500
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    wx.stopPullDownRefresh()
  }
})

