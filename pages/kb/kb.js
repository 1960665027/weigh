// pages/kb/kb.js

Page({
  
   data:{ 
     hidden:true,

     array: [
       {

         "name": '2015-2016学年第一学期',
         "value": "20151"

       },
       {

         "name": '2015-2016学年第二学期',
         "value": "20150"
       },
       {

         "name": '2016-2017学年第一学期',
         "value": "20161"
       },
       {

         "name": '2016-2017学年第二学期',
         "value": "20160"
       }
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
       ,
       {

         "name": '第二十一周',
         "value": "21"
       },
       {

         "name": '第二十二周',
         "value": "22"
       },
       {

         "name": '第二十四周',
         "value": "24"
       }
       ,
       {

         "name": '第二十五周',
         "value": "25"
       }
     ],
     keyzhi:'',
     userName:'',
     dataweek:{
     week1: '',
     week2: '',
     week3: '',
     week4: '',
     week5: '',
     week6: '',
     week7: ''
     }
  },
  onLoad:function(e)
  {
    var that = this
    var userid = wx.getStorageSync('userName')
    var passWord = wx.getStorageSync('passWord')
    if (userid == "" && passWord == "") {
       wx.showModal({
         title: '提示',
         content: '请先前去教务登录',
       })
    }
    that.setData({
      userName:userid
    })
    //请求当前星期
     wx.request({
       url: 'https://www.glyac.com/jianzhi/index.php?a=getKb',
      
       success: function(res) {
         let zc = parseInt(res.data.zc)-1
         that.setData({
           keyzhi:zc
         })
       }
     })
     //加载当前周的课表
     wx.request({
       url: 'https://www.glyac.com/jianzhi/index.php?a=getKb',
       data: {
         week: this.data.keyzhi,
         xnxq: 20170,
         userId: userid
       },
       success: function(res) {
         console.log(res);
         if (undefined == res.data.week1 && undefined == res.data.week2 && undefined == res.data.week3 && undefined == res.data.week4 && undefined == res.data.week5 && undefined == res.data.week6 && undefined == res.data.week7) {
           wx.showToast({
             title: '本周没课啦',
             icon: 'success',
             duration: 1500
           })
         }
         if (undefined == res.data.week1) {
           that.setData({
             week1: []
           })
         }
         if (undefined == res.data.week2) {
           that.setData({
             week2: []
           })
         }
         if (undefined == res.data.week3) {
           that.setData({
             week3: []
           })
         }
         if (undefined == res.data.week4) {
           that.setData({
             week4: []
           })
         }
         if (undefined == res.data.week5) {
           that.setData({
             week5: []
           })
         }
         if (undefined == res.data.week6) {
           that.setData({
             week6: []
           })
         }
         if (undefined == res.data.week7) {
           that.setData({
             week7: []
           })
         }
         that.setData({
           week1: res.data.week1,
           week2: res.data.week2,
           week3: res.data.week3,
           week4: res.data.week4,
           week5: res.data.week5,
           week6: res.data.week6,
           week7: res.data.week7,
           hidden:false
         })
 
       },
       fail: function(res) {
         wx.showToast({
           title: '你的网络好像出问题了',
           icon: 'success',
           duration: 1500
         })
       },
     })
  },
   bindPickerChange: function (e) {
     var that = this;
     that.setData({
       keyzhi: e.detail.value
     })
     let strs = this.data.xqweek[e.detail.value].value
     
     console.log(strs);
     //选择的的周数课表
     wx.request({
       url: 'https://www.glyac.com/jianzhi/index.php?a=getKb',
       data: {
         week: strs,
         xnxq: 20170,
         userId: this.data.userName
       },
       success: function (res) {
         console.log(res);
         if (undefined == res.data.week1 && undefined == res.data.week2 && undefined == res.data.week3 && undefined == res.data.week4 && undefined == res.data.week5 && undefined == res.data.week6 && undefined == res.data.week7)
         {
           wx.showToast({
             title: strs+'周没课啦',
             icon: 'success',
             duration: 1500
           })
         }
         if (undefined == res.data.week1)
         {
           that.setData({
             week1:[]
           })
         }
         if (undefined == res.data.week2) {
           that.setData({
             week2: []
           })
         }
         if (undefined == res.data.week3) {
           that.setData({
             week3: []
           })
         }
         if (undefined == res.data.week4) {
           that.setData({
             week4: []
           })
         }
         if (undefined == res.data.week5) {
           that.setData({
             week5: []
           })
         }
         if (undefined == res.data.week6) {
           that.setData({
             week6: []
           })
         }
         if (undefined == res.data.week7) {
           that.setData({
             week7: []
           })
         }

         that.setData({
           week1: res.data.week1,
           week2: res.data.week2,
           week3: res.data.week3,
           week4: res.data.week4,
           week5: res.data.week5,
           week6: res.data.week6,
           week7: res.data.week7,
         })
       },
       fail: function (res) {
         console.log(res);
         wx.showToast({
           title: '你的网络好像出问题了',
           icon: 'success',
           duration: 1500
         })
       }
     })
   },
   onShareAppMessage:function()
   {
     
   },
   KP:function(e)
   {
     let jcxx =e.currentTarget.dataset.jcxx;
     let js = e.currentTarget.dataset.js;
     let kcmc = e.currentTarget.dataset.kcmc;
     let room = e.currentTarget.dataset.room
     let skbjmc = e.currentTarget.dataset.skbjmc;
     let skzs = e.currentTarget.dataset.skzs;
     let xf = e.currentTarget.dataset.xf;
     let xq = e.currentTarget.dataset.xq;
     wx.navigateTo({
       url: '../kebiaoxq/kebiaoxq?jcxx=' + jcxx + "&js=" + js + "&kcmc=" + kcmc + "&room=" + room + "&skbjmc="+skbjmc+"&skzs="+skzs+"&xf="+xf+"&xq="+xq,
     })
   }
})