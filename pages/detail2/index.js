const activityModel = require('../../models/activity.js')
const mediaModel = require('../../models/media.js')
const imageModel = require('../../models/file.js')
var dateUtil = require('../../utils/date.js');
const date = new Date();
let now = dateUtil.tsFormatTime(date, 'yyyy-MM-dd');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    touchStartTime: 0,
    touchEndTime: 0,

    //当前时间
    now: now,
    //选中健康度索引
    gradeIndex: 0,
    //健康度列表
    grade: [
      "优",
      "良"
    ],

    //播报类型索引
    broadcastIndex: [0, 0],
    //播报数量
    broadcastCount: [
      { name: 1 },
      { name: 2 },
      { name: 3 },
      { name: 4 },
      { name: 5 },
      { name: 6 },
      { name: 7 },
      { name: 8 },
      { name: 9 },
      { name: 10 },
    ],

    //资质文件列表
    files: [],

    maxPriceLength: -1,
    maxOrderLength: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id
    this._getActivityDetail()
  },


  onShow: function () {
    if (this.data.media && this.data.data) {
      this.data.data.mediaIcon = this.data.media.icon
      this.data.data.mediaType = this.data.media.id

      this.setData({
        data: this.data.data
      })
    }
  },

  /**
   * 按钮触摸开始触发的事件
   */
  onTouchStart: function (e) {
    this.data.touchStartTime = e.timeStamp;
  },

  /**
   * 按钮触摸结束触发的事件
   */
  onTouchEnd: function (e) {
    this.data.touchEndTime = e.timeStamp;
  },

  /**
   * 选择媒体平台
   */
  onSelectMedia: function (event) {
    wx.navigateTo({
      url: '../../pages/plateform/index',
    })
  },

  /**
   * 修改标题
   */
  onChangeTitle: function (event) {
    let value = event.detail.value
    this.data.data.name = value
    this.setData({
      data: this.data.data
    })
  },

  /**
   * 修改广告链接
   */
  onChangeAdUrl: function (event) {
    let value = event.detail.value
    this.data.data.adUrl = value
    this.setData({
      data: this.data.data
    })
  },

  /**
  * 修改活动描述
  */
  onChangeDesc: function (event) {
    let value = event.detail.value
    this.data.data.desc = value
    this.setData({
      data: this.data.data
    })
  },

  /**
   * 修改资质链接
   */
  onChangeQualifiedUrl: function (event) {
    let value = event.detail.value
    this.data.data.qualifiedUrl = value
    this.setData({
      data: this.data.data
    })
  },

  /**
   * 上传活动图片
   */
  onUpdateImage: function (event) {
    this._chooseImage()
      .then(res => {
        return this._updateImage(res);
      })
      .then(res => {
        this.data.data.picUrl = res.data.url
        this.setData({
          data: this.data.data
        });
        this._getImgResolution(res.data.url)
      }, error => {
        console.log(`上传失败：${error}`);
      });
  },

  /**
   * 预览活动图片
   */
  onPreviewImage: function (event) {
    if (this.data.touchEndTime - this.data.touchStartTime > 350) return;
    wx.previewImage({
      urls: [this.data.data.picUrl],
    })
  },

  /**
   * 删除活动图片
   */
  onDeleteImage: function (event) {
    wx.showModal({
      content: '确认删除图片？',
      success: res => {
        this.data.data.picUrl = ''
        this.setData({
          data: this.data.data
        })
      }
    })
  },

  /**
  * 上传资质文件
  */
  onUpdateFile: function (event) {
    this._chooseImage()
      .then(res => {
        return this._updateImage(res);
      })
      .then(res => {
        this.data.files.push(res.data.url)
        this.setData({
          files: this.data.files
        });

      }, error => {
        console.log(`上传失败：${error}`);
      });
  },

  /**
   * 预览资质文件
   */
  onPreviewFile: function (event) {
    if (this.data.touchEndTime - this.data.touchStartTime > 350) return;
    let index = event.currentTarget.dataset.index
    wx.previewImage({
      urls: [this.data.files[index]],
    })
  },

  /**
   * 删除资质文件
   */
  onDeleteFile: function (event) {
    let index = event.currentTarget.dataset.index
    wx.showModal({
      content: '确认删除图片？',
      success: res => {
        this.data.files.splice(index, 1)
        this.setData({
          files: this.data.files
        })
      }
    })
  },

  /**
   * 选择行业分类
   */
  onSelectCategory: function (event) {
    let url = ''
    if (this.data.data.liveType != undefined) {
      url = `/pages/category/index?industryId=${this.data.data.liveType}`
    } else {
      url = '/pages/category/index'
    }
    wx.navigateTo({
      url: url,
    })
  },

  /**
   * 播报类型改变
   */
  onBroadcastTypeChanged: function (event) {
    this.setData({
      broadcastIndex: event.detail.value,
    })

    if (this.data.data) {
      this.data.data.broadcastName = this.data.multiBroadcast[0][this.data.broadcastIndex[0]].name
      this.data.data.broadcastType = this.data.multiBroadcast[0][this.data.broadcastIndex[0]].id
      this.data.data.broadcastTimes = this.data.multiBroadcast[1][this.data.broadcastIndex[1]].name
    }
  },

  /**
   * 输入订单改变
   */
  onOrderChanged: function (e) {
    let value = e.detail.value
    this.data.data.orderNum = value

    let maxOrderLength = -1
    let index = value.lastIndexOf('.')
    if (index != -1) {
      maxOrderLength = index + 1;
    }
    this.setData({
      maxOrderLength,
      data: this.data.data
    })

    this._calTotl()
  },

  /**
   * 输入单价改变
   */
  onPriceChanged: function (e) {
    let value = e.detail.value
    this.data.data.unitPrice = value

    let maxPriceLength = -1
    let index = value.lastIndexOf('.')
    if (index != -1) {
      maxPriceLength = index + 2 + 1;
    }
    this.setData({
      maxPriceLength,
      data: this.data.data
    })

    this._calTotl()
  },

  /**
   * 开始时间改变
   */
  onStartTimeChanged: function (event) {
    let value = event.detail.value
    if (value) {
      this.data.data.startTime = value
    } else {
      this.data.data.startTime = now
    }
    this.setData({
      data: this.data.data
    })
  },

  /**
   * 结束时间改变
   */
  onEndTimeChanged: function (event) {
    let value = event.detail.value
    if (value) {
      this.data.data.endTime = value
    } else {
      this.data.data.endTime = now
    }
    this.setData({
      data: this.data.data
    })
  },

  /**
   * 反馈时间改变
   */
  onFeedBackTimeChanged: function (event) {
    let value = event.detail.value
    if (value) {
      this.data.data.feedbackTime = value
    } else {
      this.data.data.feedbackTime = now
    }
    this.setData({
      data: this.data.data
    })
  },

  /**
   * 提交数据
   */
  onSubmit: function (event) {
    //行业分类
    if (this.data.industry) {
      this.data.data.liveType = this.data.industry.id
    }
    //资质文件
    this.data.data.qualifiedFile = this.data.files.join(',')

    activityModel.updateActivity(this.data.data).then(res => {
      wx.showModal({
        content: '活动提交成功，\n请到我的订单查看详情',
        showCancel: true,
        cancelText: '稍后查看',
        confirmText: '我的订单',
        confirmColor: '#fd8400',

        success: res => {
          if (res.confirm) {
            this._reset()
            wx.navigateTo({
              url: '/pages/orders/index',
            })
          } else if (res.cancel) {
            this._reset()
          }
        }
      })
    }).catch(exp => {
      wx.showModal({
        content: '活动提交失败，\n请修改后重新提交',
        showCancel: false,
        confirmText: '确定',
        confirmColor: '#fd8400',
      })
    })
  },

  /**
   * 选择照片
   */
  _chooseImage: function () {
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: 1,
        sizeType: ['origin'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          let path = res.tempFiles[0].path;
          resolve(path)
        },
        fail: e => {
          reject(e);
        }
      })
    });
  },

  /**
   * 上传照片
   */
  _updateImage(path) {
    return imageModel.uploadImage({
      path: path,
      progress: res => {
        console.log('上传进度', res.progress);
      }
    });
  },

  /**
   * 获取播报类型
   */
  _getBroadcastTypes() {
    activityModel.getBroadcastType().then(res => {
      let multiBroadcast = []
      multiBroadcast.push(res.data)
      multiBroadcast.push(this.data.broadcastCount)
      this.setData({
        multiBroadcast,
      })
      if (this.data.data) {
        let broadcastTimes = this.data.data.broadcastTimes
        let broadcastType = this.data.data.broadcastType

        //类型
        for (var i = 0; i < this.data.multiBroadcast[0].length; i++) {
          if (this.data.multiBroadcast[0][i].id == broadcastType) {
            this.data.broadcastIndex[0] = i
            break
          }
        }

        //数量
        for (var i = 0; i < this.data.multiBroadcast[1].length; i++) {
          if (this.data.multiBroadcast[1][i].name == broadcastTimes) {
            this.data.broadcastIndex[1] = i
            break
          }
        }

        this.setData({
          broadcastIndex: this.data.broadcastIndex
        })
      }
    }).catch(exp => {

    })
  },

  /**
   * 获取行业分类
   */
  _getLiveTypes: function () {
    mediaModel.getLiveTypes().then(res => {
      if (this.data.data) {
        let liveType = this.data.data.liveType
        if (liveType != undefined) {
          //分类
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].id == liveType) {
              this.data.industry = res.data[i]
              break
            }
          }
          this.setData({
            industry: this.data.industry
          })
        }
      }
    }).catch(exp => {

    })
  },

  /**
   * 根据单价和订单量计算总价
   */
  _calTotl: function () {
    if (this.data.data.orderNum && this.data.data.unitPrice) {
      let totalPrice = (Math.round(this.data.data.unitPrice * parseInt(this.data.data.orderNum) * 100) / 100).toFixed(2)

      this.data.data.totalPrice = totalPrice
      this.setData({
        data: this.data.data,
      })
    } else {
      this.data.data.totalPrice = '0.0'
      this.setData({
        data: this.data.data,
      })
    }
  },

  /**
   * 重置数据
   */
  _reset: function () {
    this.setData({
      //播报类型索引
      broadcastIndex: [0, 0],
      //资质文件列表
      files: [],

      maxPriceLength: -1,
      maxOrderLength: -1,

      platform: {},
      name: '',
      adUrl: '',
      desc: '',
      orderNum: '',
      unitPrice: '',
      startTime: now,
      endTime: now,
      feedbackTime: now,
      industry: {},
      link: '',
    })
  },

  /**
   * 获取图片尺寸
   */
  _getImgResolution(path) {
    wx.getImageInfo({
      src: path,
      success: res => {
        this.data.data.resolution = res.width + '*' + res.height
      },
    })
  },

  /**
   * 获取活动详情
   */
  _getActivityDetail: function () {
    if (this.data.id == undefined) return
    activityModel.getActivityDetail({ id: this.data.id }).then(res => {
      this.setData({
        data: res.data
      })
      //资质文件处理
      if (res.data) {
        if (res.data.qualifiedFile) {
          this.data.files = res.data.qualifiedFile.split(',')
          this.setData({
            files: this.data.files
          })
        }

        this._getLiveTypes()
        this._getBroadcastTypes()
      }
    }).catch(exp => {

    })
  },
})