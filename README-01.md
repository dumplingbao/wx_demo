
# 小程序：webview + PDF预览

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
