
# 第一部分：小程序：mqtt+webview控制显示内容

看到mqtt+webview似乎不知道能做什么，mqtt微消息服务更适用iot物联网，这个应该熟悉，但是似乎还是得从webview说起。webview的场景不仅仅是手机端的APP或者小程序用到，好多基于android主板显示的设备、大屏等webview都发挥了很大的作用。这里我们一是验证小程序的mqtt，二是通过mqtt控制设备自动切换显示内容，这样试想一下，其实就是远程操控设备显示内容的一种很好的方式。

## 效果

![01](https://ossbao.oss-cn-qingdao.aliyuncs.com/blog/2021/wx/mq/mqtt.gif)

## mqtt小程序端

需要mqtt.js客户端库：https://github.com/mqttjs/MQTT.js

小程序配置：

```
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
      clientId: 'mqtt_' + Math.random().toString(16).substr(2, 8),
      port: 8083,  //重点注意这个坑
    }

    client = mqtt.connect("wx://xx.xx.xx.xx/mqtt", options);
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
  } 
})
```

```
<web-view src="{{webUrl}}" bindmessage="getmessage"></web-view>
```

## mqtt服务端安装

*EMQ X* 是一款完全开源，高度可伸缩，高可用的分布式 MQTT 消息服务器

git地址：https://gitee.com/emqx/emqx

### docker安装步骤

```
$ docker search emqx // 查看版本
```

```
$ docker pull emqx/emqx // 拉取镜像
```

```
$ docker run -dit --name emqx -p 18083:18083 -p 1883:1883 -p 8083:8083 -p 8084:8084 emqx/emqx:latest // 运行
```

```
$ docker exec -it  emqx /bin/sh // 进入命名
```

### web管理界面

`http://127.0.0.1:18083`

`#账号： admin`

`#密码: public`

### 端口介绍

`1883：MQTT 协议端口`

`8883：MQTT/SSL 端口`

`8083：MQTT/WebSocket 端口`

`8080：HTTP API 端口`

`18083：Dashboard 管理控制台端口`

## mqtt客户端工具

我们没必要写后台代码，直接用个mqtt客户端工具做测试，用的MQTTX，这个就根据个人习惯选了

MQTTX地址：https://github.com/emqx/MQTTX/releases

安装完成配置验证即可。


# 第二部分：小程序：webview + PDF预览

一般文件预览除了图片基本主要指office的文件预览，不同文件（word、Excel、pdf）格式差异大，所以很难有共性。相对来说PDF的预览会相对简单一些，而且大都能转换成pdf，我们就已pdf为例。小程序官方未提供，目前能找到和想到的方式，如下：

## 1.采用wx.openDocument

```
wx.downloadFile({
    url: 'www.file.com/file.ppt',//可以是后台传过来的路径
    success: function(res) {
        const filePath = res.tempFilePath
        wx.openDocument({
            filePath: filePath,
            success: function(res) {
                //成功
            }
        })
    }
})
```

效果：

说明：这种实际上是先下载了临时路径，好处是pdf、word、Excel都能预览，坏处是这种方式不一定能接受。

![001](https://ossbao.oss-cn-qingdao.aliyuncs.com/blog/2021/wx/pdf/pdf001.jpg)

## 2.webview+第三方pdf库

pdfjs是个很好的pdf预览的js库，可以不用改造直接使用，简单部署个服务，或者通过nginx配置一下即可，这里我们直接通过cdn阿里oss文件服务器来运行

pdfjs获取地址：https://github.com/mozilla/pdf.js

oss服务demo：

```
https://byfile.disscode.cn/pdfjs-2.8/web/viewer.html?file=https://byfile.disscode.cn/blog/2021/wx/pdf/01.pdf
```

小程序配置就很简单了，就是通过webview的方式调用pdfjs服务，只需传递pdf文件地址即可

```
<web-view src="https://byfile.disscode.cn/pdfjs-2.8/web/viewer.html?file={{url}}"></web-view>
```

![002](https://ossbao.oss-cn-qingdao.aliyuncs.com/blog/2021/wx/pdf/pdf002.jpg)

备注：PDF.js访问远程服务器（非同域名下）报file origin does not match viewer's

需要将pdfjs下面的viewer.js中注释掉代码

```
// if (origin !== viewerOrigin && protocol !== 'blob:') {
//   throw new Error('file origin does not match viewer\'s');
// }
```

## 3.延伸markdown文件渲染

markdown格式的内容渲染已有组件可以支持，尝试markdown的文件直接进行渲染，这里直接找到第三方库marked.js进行尝试

github地址：https://github.com/markedjs/marked

同样制作oss服务的demo

```
https://byfile.disscode.cn/marked/marked.html?file=https://byfile.disscode.cn/blog/2021/wx/mk/%E3%80%90BLOG%E3%80%91hexo%E6%90%AD%E5%BB%BAblog%E6%95%99%E7%A8%8B.md
```

小程序同样是webview的方式：

```
<web-view src="https://byfile.disscode.cn/marked/marked.html?file={{url}}"></web-view>
```

![mk01](https://ossbao.oss-cn-qingdao.aliyuncs.com/blog/2021/wx/mk/mk01.jpg)

但是，markdown采用这种方式直接渲染文件，发现图片、换行等样式渲染还是有问题的，所以期待更多尝试。

备注：测试去掉域名的校验，要么就添加到小程序业务域名里面，否则不能正常访问
