// pages/kongjisobd/kongjiaobd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateValue: '2015-04-04',
    xqarr:[
      {
        "name":'星期一',
        "value":'1'
      },
      {
        "name": '星期二',
        "value": '2'
      },
      {
        "name": '星期三',
        "value": '3'
      },
      {
        "name": '星期四',
        "value": 4
      },
      {
        "name": '星期五',
        "value": '5'
      },
      {
        "name": '星期六',
        "value": '6'
      },
      {
        "name": '星期日',
        "value": '7'
      },

    ],
    xqweek: [
      {

        "name": '第一周',
        "value": "1"

      },
      {

        "name": '第二周',
        "value": "2"
      },
      {

        "name": '第三周',
        "value": "3"
      },
      {

        "name": '第四周',
        "value": "4"
      },
      {

        "name": '第五周',
        "value": "5"

      },
      {

        "name": '第六周',
        "value": "6"
      },
      {

        "name": '第七周',
        "value": "7"
      },
      {

        "name": '第八周',
        "value": "8"
      },
      {

        "name": '第九周',
        "value": "9"

      },
      {

        "name": '第十周',
        "value": "10"
      },
      {

        "name": '第十一周',
        "value": "11"
      },
      {

        "name": '第十二周',
        "value": "12"
      },
      {

        "name": '第十三周',
        "value": "13"

      },
      {

        "name": '第十四周',
        "value": "14"
      },
      {

        "name": '第十五周',
        "value": "15"
      },
      {

        "name": '第十六周',
        "value": "16"
      }
      , {

        "name": '第十七周',
        "value": "17"

      },
      {

        "name": '第十八周',
        "value": "18"
      },
      {

        "name": '第十九周',
        "value": "19"
      },
      {

        "name": '第二十周',
        "value": "20"
      }
    ],
    xiaoqu:[
      {

        "name": '北校区',
        "value": "0"
      },
      {

        "name": '南校区',
        "value": "1"
      }
    ],
    nanxiao:[
      {
        "name": '巡天楼',
        "value": "0"
      },
      {
        "name": '飞天楼',
        "value": "1"
      }
      
    ],
    beixiao:[
      {
        "name": '1号实习车间',
        "value": "0"
      },
      {
        "name": '2号实习车间',
        "value": "1"
      },
      {
        "name": '3号实习车间',
        "value": "2"
      },
      {
        "name": '3号实验楼',
        "value": "3"
      }
      ,
      {
        "name": '4号实习车间',
        "value": "4"
      },
      {
        "name": '凌志楼A',
        "value": "5"
      },
      {
        "name": '凌志楼B',
        "value": "6"
      },
      {
        "name": '北校区莘子苑',
        "value": "7"
      },
      {
        "name": '明志楼',
        "value": "8"
      },
      {
        "name": '格物楼',
        "value": "9"
      },
      {
        "name": '致知楼',
        "value": "10"
      },
      {
        "name": '致远楼',
        "value": "11"
      }
    ],
    keyzhi: '',
    zhoushu:'',
    keyxq:0,
    keyxiaoqu:0,
    valuexq:'',
    keynan:0,
    keybeixiao:0,
    valuelou:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    //请求当前星期
    wx.request({
      url: 'https://www.glyac.com/jianzhi/index.php?a=getKb',

      success: function (res) {
        let zc = parseInt(res.data.zc)
        console.log(zc)
        that.setData({
          keyzhi: zc
        })
      }
    })
  },

  bindPickerChangezs:function(e)
  {
    console.log('周次', e.detail.value)
   let   zhoushu = e.detail.value
    this.setData({
      keyzhi: zhoushu
    })
    
  },
  bindPickerChangezsxq:function(e)
  {
    console.log('星期', e)
    let xingqi = e.detail.value
    this.setData({
      keyxq: xingqi
    })

  },
  PickerBindchangexiaoqu:function(e)
  {
    
    let xiaoqu = e.detail.value
    let zhi = this.data.xiaoqu[xiaoqu].name
    console.log('校区', zhi)
    this.setData({
      keyxiaoqu: xiaoqu,
      valuexq: zhi
    })
  },
  PickerBindchangenanlou:function(e)
  {
    let beixiao = e.detail.value
    let zhi = this.data.beixiao[beixiao].name
    console.log('北校', zhi)
    this.setData({
      keybeixiao: beixiao,
      valuelou: zhi
    })
  },
  PickerBindchangebeilou: function (e) {
    let nanxiao = e.detail.value
    let zhi = this.data.nanxiao[nanxiao].name
    console.log('南校', zhi)
    this.setData({
      keynan: nanxiao,
      valuelou: zhi
    })
  },
  formSubmit:function(e)
  {
    wx.navigateTo({
      url: '../kongjiao/kongjiao?zs=' + this.data.keyzhi + '&xq=' + this.data.keyxq + '&xiaoqu=' + this.data.valuexq+'&lou='+this.data.valuelou
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