// pages/share/poster/poster.js
Component({
  properties: {
    //属性值可以在组件使用时指定
    isPoster: {
      type: Boolean,
      value: false,
      observer(newVal, oldVal) {
        newVal && this.drawPicPoster()
      }
    },
		id: {
			type: String,
    },
    time: {
      type: String,
    },
    source: {
      type: String,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    }
  },
  data: {
    imgDrawPosterPoster: {}, //绘制图片的大对象
    sharePathPoster: '', //生成的分享图
    visiblePoster: false
  },
  methods: {
    handleClosePoster() {
      this.setData({
        visiblePoster: false
      })
      this.triggerEvent('closePoster')
    },
    drawPicPoster() {
      // 每次都需要重新绘制
      this.setData({
        visiblePoster: true
      })
      // this.triggerEvent('initData') 
      wx.showLoading({
        title: '生成中'
      })
      this.setData({
        imgDrawPoster: {
          width: '654rpx',
          height: '1000rpx',
          background: '#ffffff',
          views: [
            {
              type: 'image',
              url: 'https://ossbao.oss-cn-qingdao.aliyuncs.com/blog/2021/wx/pt/bg.jpg',
              css: {
                top: '0rpx',
                left: '0rpx',
                right: '0rpx',
                width: '654rpx',
                height: '150rpx',
                borderRadius: '5rpx'
              },
            },
            {
              type: 'text',
              text: 'diss带码',
              css: {
                width: '654rpx',
                top: '50rpx',
                left: '200rpx',
                maxLines: 1,
                align: 'left',
                fontSize: '40rpx',
                fontWeight: 'bold',
                color: '#ffffff',
								lineHeight: '90rpx'
              }
            },
            // {
            //   type: 'image',
            //   url: '/images/fonts.png',
            //   css: {
            //     top: '80rpx',
            //     left: '0rpx',
            //     right: '113rpx',
            //     width: '428rpx',
            //     height: '48rpx',
            //     borderRadius: '16rpx'
            //   },
            // },
            {
              type: 'text',
              text: this.data.time,
              css: {
                width: '654rpx',
                top: '170rpx',
                left: '20rpx',
                maxLines: 1,
                align: 'left',
                fontSize: '30rpx',
                color: '#3c3c3c',
								lineHeight: '90rpx'
              }
            },
            {
              type: 'text',
              text: this.data.title,
              css: {
                width: '624rpx',
                top: '220rpx',
                left: '20rpx',
                maxLines: 2,
                align: 'left',
                fontWeight: 'bold',
                fontSize: '35rpx',
                color: '#3c3c3c',
								lineHeight: '45rpx'
              }
            },
            {
              type: 'text',
              text: this.data.content,
              css: {
                width: '580rpx',
                top: '330rpx',
                fontSize: '33rpx',
                left: '20rpx',
                align: 'left',
                color: '#3c3c3c',
                maxLines: '7',
								lineHeight:'46rpx'
              }
            },
            {
              type: 'text',
              text: this.data.source,
              css: {
                top: '680rpx',
                fontSize: '25rpx',
                left: '30rpx',
                align: 'left',
                color: '#1E90FF',
                borderColor: '#1E90FF',
                background: '#f1eeee',
                // borderWidth: '1',
                borderRadius: '5',
                maxLines: '1',
								lineHeight:'30rpx'
              }
            },
            {
              type: 'image',
              url: 'https://ossbao.oss-cn-qingdao.aliyuncs.com/by10/xcx.jpg',
              css: {
                top: '680rpx',
                left: '0rpx',
                right: '320rpx',
                align: 'center',
                width: '250rpx',
                height: '250rpx'
              },
            }            
          ]
        }
      })
    },
    onImgErrPoster(e) {
      wx.hideLoading()
      wx.showToast({
        title: '生成分享图失败，请刷新页面重试'
      })
    },
    onImgOKPoster(e) {
      wx.hideLoading()
      this.setData({
        sharePathPoster: e.detail.path,
        visiblePoster: true,
      })
      //通知外部绘制完成，重置isPoster为false
      this.triggerEvent('initDataPoster', {params: e.detail.path}) 
    },
    preventDefault() { },
    // 保存图片
    handleSavePhotoPoster() {
      wx.showLoading({
        title: '正在保存...',
        mask: true
      })
      wx.saveImageToPhotosAlbum({
        filePath: this.data.sharePathPoster,
        success: () => {
          wx.showToast({
            title: '保存成功'
          })
          setTimeout(() => {
            this.setData({
              visiblePoster: false
            })
            this.triggerEvent('closePoster')
          }, 300)
        },
        fail: () => {
          wx.getSetting({
            success: res => {
              let authSetting = res.authSetting
              if (!authSetting['scope.writePhotosAlbum']) {
                wx.showModal({
                  title: '提示',
                  content: '您未开启保存图片到相册的权限，请点击确定去开启权限！',
                  success(res) {
                    if (res.confirm) {
                      wx.openSetting()
                    }
                  }
                })
              }
            }
          })
          setTimeout(() => {
            wx.hideLoading()
            this.setData({
              visiblePoster: false
            })
            this.triggerEvent('closePoter')
          }, 300)
        }
      })
    }
  },
  
})