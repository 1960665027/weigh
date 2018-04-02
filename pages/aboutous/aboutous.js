// pages/aboutous/aboutous.js
Page({
  data:{

    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 25px; color: #c0c0c0;'
      },
      children: [{
        type: 'text',
        text: '&nbsp;&nbsp;桂航课表，功能教务系统用户输入学号密码登录之后可以便捷查询课表和成绩，在空教室入口提交需要查询即可获取到数据，运动是将用户的步数进行天排行和30天排行。'
      }]
    },
    {
        name: "div",
        attrs: {
          style: "line-height: 25px; color: #c0c0c0;",
          class: "red"
        },
        children: [{
          type: "text",
          text: '如果你对本小程序感兴趣，或想进行相关技术交流，可以加我微信（18276061387)。'
        }],
      }]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  contantous:function(e){
    let num = e.currentTarget.dataset.num;
    wx.makePhoneCall({
      phoneNumber: num
    })
  },
  
  tap() {
    console.log('tap')
  }

})