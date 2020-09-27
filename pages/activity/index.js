const activityModel = require('../../models/activity.js')
const imageModel = require('../../models/file.js')
var dateUtil = require('../../utils/date.js');
const date = new Date();
let now = dateUtil.tsFormatTime(date, 'yyyy-MM-dd');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //0.提交中；1：审核失败
    type: 0,
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
    //活动图片列表
    images: [],

    maxPriceLength: -1,
    maxOrderLength: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getBroadcastTypes()
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
   * 选择行业分类
   */
  onSelectCategory: function (event) {
    wx.navigateTo({
      url: '/pages/category/index',
    })
  },

  /**
   * 上传资质文件
   */
  onUpdateImage: function (event) {
    this._chooseImage()
      .then(res => {
        return this._updateImage(res);
      })
      .then(res => {
        this.data.images.push(res.data.url)
        this.setData({
          images: this.data.images
        });
        this._getImgResolution(res.data.url)
      }, error => {
        console.log(`上传失败：${error}`);
      });
  },

  /**
   * 预览数据截图
   */
  onPreviewImage: function (event) {
    if (this.data.touchEndTime - this.data.touchStartTime > 350) return;
    let index = event.currentTarget.dataset.index
    wx.previewImage({
      urls: [this.data.images[index]],
    })
  },

  /**
   * 删除数据截图
   */
  onDeleteImage: function (event) {
    let index = event.currentTarget.dataset.index
    wx.showModal({
      content: '确认删除图片？',
      success: res => {
        this.data.images.splice(index, 1)
        this.setData({
          images: this.data.images
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
   * 播报类型改变
   */
  onBroadcastTypeChanged: function (event) {
    this.setData({
      broadcastIndex: event.detail.value,
    })
  },

  /**
   * 输入订单改变
   */
  onOrderChanged: function (e) {
    let value = e.detail.value
    let maxOrderLength = -1
    let index = value.lastIndexOf('.')
    if (index != -1) {
      maxOrderLength = index + 1;
    }
    this.setData({
      maxOrderLength,
    })

    this._calTotl()
  },

  /**
   * 输入单价改变
   */
  onPriceChanged: function (e) {
    let value = e.detail.value
    let maxPriceLength = -1
    let index = value.lastIndexOf('.')
    if (index != -1) {
      maxPriceLength = index + 2 + 1;
    }
    this.setData({
      maxPriceLength,
    })

    this._calTotl()
  },

  /**
   * 提交数据
   */
  onSubmit: function (event) {
    let param = {}
    //媒体类型(平台)
    if (this.data.media != undefined) {
      param.mediaType = this.data.media.id
    } else {
      wx.showToast({
        title: '请选择媒体平台',
        icon: 'none',
      })
      return
    }
    //活动主题
    if (this.data.name != undefined) {
      param.name = this.data.name
    } else {
      wx.showToast({
        title: '请输入活动标题',
        icon: 'none',
      })
      return
    }
    //活动图片
    if (this.data.images != undefined && this.data.images.length > 0) {
      param.picUrl = this.data.images.join(',')
    } else {
      wx.showToast({
        title: '请上传活动图片',
        icon: 'none',
      })
      return
    }
    //播报类型
    if (this.data.multiBroadcast != undefined) {
      param.broadcastType = this.data.multiBroadcast[0][this.data.broadcastIndex[0]].id
    }
    //播报数量
    if (this.data.multiBroadcast != undefined) {
      param.broadcastTimes = this.data.multiBroadcast[1][this.data.broadcastIndex[1]].name
    }
    //广告链接
    if (this.data.adUrl != undefined) {
      param.adUrl = this.data.adUrl
    }
    //活动描述
    if (this.data.desc != undefined) {
      param.desc = this.data.desc
    }
    //订单量
    if (this.data.orderNum != undefined && this.data.orderNum > 0) {
      param.orderNum = this.data.orderNum
    } else {
      wx.showToast({
        title: '请输入订单数量',
        icon: 'none',
      })
      return
    }
    //单价
    if (this.data.unitPrice != undefined && this.data.unitPrice > 0 && this.data.unitPrice < 10000000) {
      param.unitPrice = this.data.unitPrice
      param.totalPrice = this.data.totalPrice
    } else {
      wx.showToast({
        title: '请输入合法的单价',
        icon: 'none',
      })
      return
    }
    //开始时间
    if (this.data.startTime != undefined) {
      param.startTime = this.data.startTime
    } else {
      this.data.startTime = now
      param.startTime = this.data.startTime
    }
    //结束时间
    if (this.data.endTime != undefined) {
      param.endTime = this.data.endTime
    } else {
      this.data.endTime = this.data.startTime
      param.endTime = this.data.endTime
    }
    //反馈时间
    if (this.data.feedbackTime != undefined) {
      param.feedbackTime = this.data.feedbackTime
    } else {
      this.data.feedbackTime = this.data.endTime
      param.feedbackTime = this.data.feedbackTime
    }
    //活动分类
    if (this.data.industry != undefined) {
      param.liveType = this.data.industry.id
    }
    //资质链接
    if (this.data.link != undefined) {
      param.qualifiedUrl = this.data.link
    }
    //资质文件
    if (this.data.files != undefined) {
      param.qualifiedFile = this.data.files.join(',')
    }
    //图片分辨率
    if (this.data.resolution != undefined) {
      param.resolution = this.data.resolution
    }

    // let data = {
    //   adUrl: adUrl,
    //   broadcastTimes: broadcastTimes,
    //   broadcastType: broadcastType,
    //   desc: desc,
    //   endTime: endTime,
    //   feedbackTime: feedbackTime,
    //   // id: id,
    //   mediaType: mediaType,
    //   name: name,
    //   orderNum: orderNum,
    //   picUrl: picUrl,
    //   qualifiedFile: qualifiedFile,
    //   qualifiedUrl: qualifiedUrl,
    //   resolution: resolution,
    //   startTime: startTime,
    //   totalPrice: totalPrice,
    //   unitPrice: unitPrice
    // }

    activityModel.addActivity(param).then(res => {
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
    }).catch(exp => {

    })
  },

  /**
   * 根据单价和订单量计算总价
   */
  _calTotl: function () {
    if (this.data.unitPrice != undefined && this.data.orderNum != undefined) {
      let totalPrice = (Math.round(this.data.unitPrice * parseInt(this.data.orderNum) * 100) / 100).toFixed(2)
      console.log(totalPrice);
      this.setData({
        totalPrice,
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
      //活动图片列表
      images: [],

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
        this.data.resolution = res.width + '*' + res.height
      },
    })
  },
})