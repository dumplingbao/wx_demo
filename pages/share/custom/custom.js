Component({
  properties: {
    //属性值可以在组件使用时指定
    isCanDraw: {
      type: Boolean,
      value: false,
      observer(newVal, oldVal) {
        newVal && this.drawPic()
      }
    },
    time: {
			type: String,
			value: '',
			observer(newVal, oldVal) {
				newVal && this.drawPic()
			}
		},
		id: {
			type: String,
			value: '',
			observer(newVal, oldVal) {
				newVal && this.drawPic()
			}
		},
    title: {
      type: String,
      value: '',
      observer(newVal, oldVal) {
        newVal && this.drawPic()
      }
    },
    content: {
      type: String,
      value: '',
      observer(newVal, oldVal) {
        newVal && this.drawPic()
      }
    }
  },
  data: {
    imgDraw: {}, //绘制图片的大对象
    sharePath: '', //生成的分享图
    visible: false
  },
  methods: {
    handleClose() {
      this.setData({
        visible: false
      })
      this.triggerEvent('close')
    },
    drawPic() {
      // 每次都需要重新绘制
      this.setData({
        visible: true
      })
      // this.triggerEvent('initData') 
      wx.showLoading({
        title: '生成中'
      })
      this.setData({
        imgDraw: {
          width: '1200rpx',
          height: '960rpx',
          background: '/images/sharebg.png',
          views: [
            {
              type: 'text',
              text: this.data.title,
              css: {
                width: '1000rpx',
                top: '60rpx',
                left: '600rpx',
                maxLines: 2,
                align: 'center',
                fontWeight: 'bold',
                fontSize: '80rpx',
                color: '#3c3c3c',
								lineHeight: '90rpx'
              }
            },
            {
              type: 'text',
              text: this.data.time,
              css: {
                width: '1000rpx',
                top: '270rpx',
                left: '620rpx',
                maxLines: 1,
                align: 'center',
                fontSize: '40rpx',
                color: '#3c3c3c',
								lineHeight: '90rpx'
              }
            },
            {
              type: 'text',
              text: this.data.content,
              css: {
                width: '920rpx',
                top: '330rpx',
                fontSize: '55rpx',
                left: '580rpx',
                align: 'center',
                color: '#3c3c3c',
                maxLines: '6',
								lineHeight:'90rpx'
              }
            }           
          ]
        }
      })
    },
    onImgErr(e) {
      wx.hideLoading()
      wx.showToast({
        title: '生成分享图失败，请刷新页面重试'
      })
    },
    onImgOK(e) {
      wx.hideLoading()
      this.setData({
        sharePath: e.detail.path,
        visible: true,
      })
      //通知外部绘制完成，重置isCanDraw为false
      this.triggerEvent('initData', {params: e.detail.path}) 
    },
    createPoster() {
      //通知外部绘制完成，重置isCanDraw为false
      this.triggerEvent('createPoster') 
    },
    preventDefault() { },
    // 保存图片
    handleSavePhoto() {
      wx.showLoading({
        title: '正在保存...',
        mask: true
      })
      wx.saveImageToPhotosAlbum({
        filePath: this.data.sharePath,
        success: () => {
          wx.showToast({
            title: '保存成功'
          })
          setTimeout(() => {
            this.setData({
              visible: false
            })
            this.triggerEvent('close')
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
              visible: false
            })
            this.triggerEvent('close')
          }, 300)
        }
      })
    }
  },
  
})