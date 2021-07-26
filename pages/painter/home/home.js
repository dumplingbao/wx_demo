// pages/painter/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCanDraw: false,
    isPoster: false,
    sharePath: '',
    news:[
      {
        time:'2021年7月24日',
        items:[
          {
            id: '1',
            title: '3位中国姑娘3枚奥运金牌',
            source: '#百度',
            time: '18:00',
            cmtNum: '120',
            loveNum: '111',
            content: '东京奥运会首日，3位中国姑娘杨倩、侯志慧、孙一文获得3枚奥运金牌。一起期待中国队在接下来的比赛中，再创佳绩!'
          },
          {
            id: '2',
            title: '东京奥运第一首国歌是中国的',
            source: '#百度',
            time: '12:00',
            cmtNum: '90',
            loveNum: '81',
            content: '7月24日上午结束的射击女子10米气步枪决赛中，中国选手杨倩夺得东京奥运会第一枚金牌。'
          },
        ]
      },
      {
        time:'2021年7月23日',
        items:[
          {
            id: '3',
            title: '东京奥运会惊现北京奥运会纪念书包',
            source: '#虎嗅',
            time: '18:00',
            cmtNum: '113',
            loveNum: '101',
            content: '2021年东京奥运会看见了“老朋友”，那就是08年北京奥运会的媒体包。'
          },
          {
            id: '4',
            title: '河南公示捐赠款物使用明细',
            source: '#虎嗅',
            time: '12:00',
            cmtNum: '234',
            loveNum: '123',
            content: '河南捐赠款物使用明细公示，截至7月23日20时，河南省慈善总会已收到抗洪救灾捐款26.64亿元，已按照省抗洪救灾指挥部批准的拨付方案拨付17.98亿元。'
          },
          {
            id: '5',
            title: '鸿星尔克7月23日销量增长超52倍',
            source: '#虎嗅',
            time: '12:00',
            cmtNum: '56',
            loveNum: '24',
            content: '7月23日，国潮运动品牌销售暴涨，位居销售规模前列。值得注意的是，国潮品牌鸿星尔克销售额同比增长超52倍。'
          },
        ]
      },
      {
        time:'2021年7月22日',
        items:[
          {
            id: '6',
            title: '中国跨境电商半年交易额近九千亿元。',
            source: '#虎嗅',
            time: '18:00',
            cmtNum: '34',
            loveNum: '24',
            content: '从23日举行的2021中国跨境电商交易会（秋季）发布会上获悉，2021年上半年，中国内地跨境电商进出口额8867亿元人民币，同比增长28.6%。其中，仅广州地区就聚集超三万家跨境电商企业。据中国商务部外贸发展事务局国际展览处苗华伟处长介绍，跨境电商逐渐成为中国外贸的重要增长极，中国跨交会能进一步激发跨境电商的创新活力，为全球经济复苏增添新动能。'
          },
          {
            id: '7',
            title: '证监会通报“中源家居”“利通电子”等股价操纵案调查情况。',
            source: '#虎嗅',
            time: '12:00',
            cmtNum: '345',
            loveNum: '234',
            content: '经查，2020年9月至2021年5月，史某等操纵团伙控制数十个证券账户，通过连续交易、对倒等违法方式拉抬“中源家居”“利通电子”股票价格，交易金额达30余亿元，相关行为已达到刑事立案追诉标准，涉嫌构成操纵市场犯罪。经调查还发现，相关金融机构个别人员涉嫌非国家工作人员受贿犯罪。目前，证监会已依法将上述涉嫌违法犯罪案件及线索移送公安机关追究刑事责任。'
          }
        ]
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  onShareAppMessage: function (options) {
    // 来自页面内的按钮的转发
　　if( options.from == 'button' ){
　　　 return {
        title: '',
        // 这地方默认应该跳到新闻详情页
        path: '/pages/painter/home/home?id=' + options.target.dataset.id,
        imageUrl: this.data.sharePath,
        success(e) {
          wx.showShareMenu({
            withShareTicket: true
          })
        }
      }
    }
    // 默认分享
    return{
      title: '码动人生，小程序demo',
      desc: '【diss带码】',
      path: '/pages/index/index',
      imageUrl:'/images/diss.jpg',
      success(e){
        wx.showShareMenu({
          withShareTicket:true
        })
      }
    }
  },

  // 分享 satrt
  handleClose(e){
    this.setData({
      isCanDraw: !this.data.isCanDraw
    })
  },
  handleClosePoster(e){
    this.setData({
      isPoster: !this.data.isPoster,
      isCanDraw: !this.data.isCanDraw
    })
  },
  openShare(e){
    // console.log(e.currentTarget.dataset.title)
    // console.log(e.currentTarget.dataset.content)
    this.setData({
      timeShare: e.currentTarget.dataset.time,
      sourceShare: e.currentTarget.dataset.source,
			idShare: e.currentTarget.dataset.id,
      titleShare: e.currentTarget.dataset.title,
      contentShare: e.currentTarget.dataset.content,
      isCanDraw: !this.data.isCanDraw
    })
  },
  initData(e){
    // console.log(e.detail.params)
    this.setData({
      sharePath: e.detail.params
    })
  },
  createPoster(){
    this.setData({
      isPoster: !this.data.isPoster
    })
  }
	// 分享 end
})