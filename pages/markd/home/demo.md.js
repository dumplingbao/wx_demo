module.exports = `
# Davinci-二次开发系列07：BI新元素尝试

​	忙于工作，停更很长时间了，最近继续开搞，先写此一篇。生活犹如演绎，写作算是解说，先看效果：

​	![seas-xgt01](https://ossbao.oss-cn-qingdao.aliyuncs.com/blog/davinci/07/seas_xgt01.gif)

# 由来

​	想在BI里面引入一些别具一格的新元素，这个想法由来已久，本来是想做下面的这种效果：

![xkcd](https://ossbao.oss-cn-qingdao.aliyuncs.com/blog/chart/chart.gif)

​	这个是[chart.xkcd](https://github.com/timqian/chart.xkcd) 手绘风格图表库，我之前写过一篇介绍，详细介绍可以查看[手绘风格的图表库（char.xkcd）](https://dumplingbao.github.io/2019/08/20/char-xkcd/)，可是由于davinci采用的是echarts，通过尝试未找到合适的很好的解决方案，只能暂时搁置了。

​	所以先做了这个鱼馆的场景，缘起于之前做过的项目，类似于一个积分系统，从积分到最终呈现单独做的。试想一下，如果有这样的BI工具，支持这样的场景，也就能根据数据快速生成，所以这样想，需求、场景都是有的，就尝试在BI里面集成这种鱼馆的效果，也算给BI的一种新的元素。

# 技术选型

​	技术点在动画选型上，后端不需要操作，这里我们推荐几种技术实现

- jQuery：之前就是用jQuery实现的，完全没有问题，就是代码量看上去比较繁琐

- lufylengend：这是个h5的引擎，简单、功能强大，有兴趣可以了解一下，用于实现这个功能偏重，但是后续考虑增加一些特性会比较方便，功能没得说。

- animate相关的npm包：

  ​	1、[animate-npm](https://www.npmjs.com/package/animate)：这个包有点像被抢注了，功能实在简单，简单到看上去就不是你想要的

  ​	2、[bendc](https://github.com/bendc)/**[animate](https://github.com/bendc/animate)**：这个是个封装的js文件，是6年前开发的了，完全够用，操作方便

  ​	3、[bendc](https://github.com/bendc)/**[animateplus](https://github.com/bendc/animateplus)**：这个包和上一个是一个作者，一看就是升级版，也已经开发有3年了，支持npm直接安装

​	这里我们用的[bendc](https://github.com/bendc)/**[animateplus](https://github.com/bendc/animateplus)**，也可以尝试其它的，我们用到的动画只是简单的，不需要复杂的功能，更不需要复杂的算法。这里特别强调一下，这个本身就是开源的封装，没有完整的api，知识盲点会导致需要不断的尝试才行。

# 功能点介绍

| 序号 | 功能     | 备注                                         |
| ---- | -------- | -------------------------------------------- |
| 1    | 数据模型 | 一个维度，一个指标，示例：用户和积分         |
| 2    | 主题     | 鱼馆背景可切换，海洋元素一些引入             |
| 3    | 速度     | 速度可设定                                   |
| 4    | 积分等级 | 目前固定，通过积分判断区间和对应的等级及动物 |
| 5    | 信息展示 | 默认展示维度信息，如用户及积分信息           |

# 背景切换

![seas-bj](https://ossbao.oss-cn-qingdao.aliyuncs.com/blog/davinci/07/seas-bj.gif)

# 速度切换

![seas-speed](https://ossbao.oss-cn-qingdao.aliyuncs.com/blog/davinci/07/seas-speed.gif)

# 显示指标

单击显示指标信息，再次单击隐藏指标信息，我们也不提倡排名看分就隐藏

![seas-xszb](https://ossbao.oss-cn-qingdao.aliyuncs.com/blog/davinci/07/seas-xszb.gif)

# 示例数据结构

![seas-data](https://ossbao.oss-cn-qingdao.aliyuncs.com/blog/davinci/07/seas-data.jpg)

# 积分等级处理

​    这里效果图是随机取的动物，正常配置通过积分判断所处的等级和对应的动物，目前是静态的配置文件，后续也应该是可配置化。

![seas-level](https://ossbao.oss-cn-qingdao.aliyuncs.com/blog/davinci/07/seas-level.jpg)

# 交流学习

学习Metabase、Davinci等开源BI，群号：72569367，感兴趣的可以加一下。

备注：技术选型尝试多次，每个都有各自的优缺点，就会有所取舍，亦或者不能完全深入了解，这次BI里面加入这种非常规的东西也算是一种尝试，欢迎进群交流，留言和点赞。gif图片太大，进行了压缩，影响效果，由于素材牵扯版权的问题，暂时也不能提交代码，希望能制作素材的朋友联系。
`;
