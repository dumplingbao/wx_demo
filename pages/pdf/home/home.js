// pages/pdf/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pdfList: [{
        title: '城南旧事.pdf',
        name: 'red',
        color: '#e54d42',
        url: 'https://byfile.disscode.cn/blog/2021/wx/pdf/01.pdf'
      },
      {
        title: '鲁滨逊漂流记.pdf',
        name: 'orange',
        color: '#f37b1d',
        url: 'https://byfile.disscode.cn/blog/2021/wx/pdf/02.pdf'
      },
      {
        title: '水浒传.pdf',
        name: 'yellow',
        color: '#fbbd08',
        url: 'https://byfile.disscode.cn/blog/2021/wx/pdf/03.pdf'
      },
      {
        title: '简书01.pdf',
        name: 'olive',
        color: '#8dc63f',
        url: 'https://byfile.disscode.cn/blog/2021/wx/pdf/04.pdf'
      },
      {
        title: '简书02.pdf',
        name: 'green',
        color: '#39b54a',
        url: 'https://byfile.disscode.cn/blog/2021/wx/pdf/05.pdf'
      },
    ],
    pdfWxList: [{
        title: '城南旧事.pdf',
        name: 'red',
        color: '#e54d42',
        url: 'https://byfile.disscode.cn/blog/2021/wx/pdf/01.pdf'
      },
      {
        title: '鲁滨逊漂流记.pdf',
        name: 'orange',
        color: '#f37b1d',
        url: 'https://byfile.disscode.cn/blog/2021/wx/pdf/02.pdf'
      }
    ],
    markdownList: [{
        title: '【BLOG】hexo搭建blog教程.md',
        name: 'red',
        color: '#e54d42',
        url: 'https://byfile.disscode.cn/blog/2021/wx/mk/%E3%80%90BLOG%E3%80%91hexo%E6%90%AD%E5%BB%BAblog%E6%95%99%E7%A8%8B.md'
      },
      {
        title: 'github自定义主页秀.md',
        name: 'orange',
        color: '#f37b1d',
        url: 'https://byfile.disscode.cn/blog/2021/wx/mk/%E3%80%90BLOG%E3%80%91hexo%E6%90%AD%E5%BB%BAblog%E6%95%99%E7%A8%8B.md'
      }
    ]
  },
  // pdfjs第三方
  toView: function (e) {
    wx.navigateTo({
      url: '/pages/view/home/home?url=' + e.currentTarget.dataset.url
    })
  },
  // 微信
  toViewWx: function (e) {
    wx.downloadFile({
        url: e.currentTarget.dataset.url,//可以是后台传过来的路径
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
  },
  // markdown第三方
  toMarked: function (e) {
    wx.navigateTo({
      url: '/pages/view/markd/markd?url=' + e.currentTarget.dataset.url
    })
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
  onShareAppMessage: function () {

  }
})