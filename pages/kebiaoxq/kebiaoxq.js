// pages/kebiaoxq/kebiaoxq.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    room:"",
    jcxx: "",
    js: "",
    kcmc: "",
    skbjmc: "",
    skzs: "",
    xf: "",
    xq: "",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
     this.setData({
       room:res.room,
       jcxx: res.jcxx,
       js: res.js,
       kcmc: res.kcmc,
       skbjmc: res.skbjmc,
       skzs: res.skzs,
       xf: res.xf,
       xq: res.xq,
     })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})