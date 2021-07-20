// pages/webview/home/home.js
const app = getApp()
var mqtt = require('../../../utils/mqtt.min')
var client = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    webUrl: 'https://www.baidu.com'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.connnectMqtt()
  },

  connnectMqtt: function (){
    var that = this
    const options = {
      connectTimeout: 4000, // 超时时间
      // clientId: 'wx_' + parseInt(Math.random() * 100 + 800, 10),
      clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
      // protocolId: 'MQTT',
      // protocolVersion: 4,
      port: 8083,  //重点注意这个坑
      // username: '',
      // password: '',
    }

    // client = mqtt.connect('wx://mqtt-cn-7mz25s35405.mqtt.aliyuncs.com', options)
    client = mqtt.connect("wx://47.114.88.211/mqtt", options);
    client.on('reconnect', (error) => {
        console.log('正在重连:', error)
    })

    client.on('error', (error) => {
        console.log('连接失败:', error)
    })
    client.on('connect', (e) => {
        console.log('成功连接服务器')
  　　　　　　　//订阅一个主题
        client.subscribe('test', {
            qos: 0
        }, function(err) {
            if (!err) {
                console.log("订阅成功")
            }
        })
    })
    client.on('message', function (topic, message) {
        console.log('received msg:' + message.toString());
        that.setData({
          webUrl: message.toString()
        })
        console.log(that.data.webUrl)
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