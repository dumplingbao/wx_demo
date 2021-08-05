

# 小程序：Painter画布

Painter这个小程序画布组件应该很多人在用，github上超3K的star就已经说明这个组件的强大了。这里我们用这个组件实现短讯（如24小时动态）的分享和海报生成。

## 效果

![p001](https://ossbao.oss-cn-qingdao.aliyuncs.com/blog/2021/wx/pt/p001.jpg)



图二生成的图片，也是分享出去的效果，可以点击分享跳转到短讯的详情即可，分享到群如下：

![p002](https://ossbao.oss-cn-qingdao.aliyuncs.com/blog/2021/wx/pt/p002.jpg)

## 介绍

Painter组件地址：https://github.com/Kujiale-Mobile/Painter

可以通过源代码看一下组件的实现方式，其实Painter的readMe里面已经把组件的实现方式描述的很详细了，组件接收json格式，然后通过pen.js（画笔）画出json格式不同类型（文本、图片、矩形、qrcode ）的view绘制，这种方式设计巧妙，对于很多复杂的情况需求都能满足。而且代码完善，优化调整也很方便。

Painter提供的工具能够将json数据直接转换效果，方便调试，链接地址：

链接1：https://painterjs.github.io/

链接2：https://lingxiaoyi.github.io/painter-custom-poster/

我们上面短讯的效果，只需利用Painter封装两个组件，一个用于分享，一个用于生成海报，控制两个组件显示隐藏即可。通过按钮传递标题、时间、标签、内容等信息，并通过组件接收，然后拼装json文件传递给Painter组件。

```
<!-- 分享绘图组件 -->
<share-box wx:if="{{isCanDraw}}" isCanDraw="{{isCanDraw}}" time="{{timeShare}}" source="{{sourceShare}}" id="{{idShare}}" title="{{titleShare}}"  content="{{contentShare}}" bind:close="handleClose"  bind:initData="initData" bind:createPoster="createPoster"/>

<!-- 海报组件 -->
<poster-box isPoster="{{isPoster}}" time="{{timeShare}}" source="{{sourceShare}}" id="{{idShare}}" title="{{titleShare}}"  content="{{contentShare}}" bind:closePoster="handleClosePoster"/>
```

此外，我们利用lin-ui实现了日期的吸顶效果（备：lin-ui对于吸顶效果的封装很易用，可以尝试一下）、内容展示的卡片效果，不再赘述。

