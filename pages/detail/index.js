const activityModel = require('../../models/activity.js')
const mediaModel = require('../../models/media.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    data: {},

    list: [],
    page: 1,
    size: 20,
    lock: false,
    hasMore: true,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id
    this._getActivityDetail()
    this._getActivityAccounts()
  },

  /**
   * 滑动到页面底部
   */
  onReachBottom: function () {
    this._getActivityAccounts();
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

      this._getLiveTypes()
      this._getBroadcastTypes()
    }).catch(exp => {

    })
  },

  /**
   * 重置数据
   */
  _reset(status) {
    this.setData({
      status,
      orders: [],
      page: 1,
      lock: false,
      hasMore: true,
    });
  },

  /**
   * 是否加锁（正在请求数据）
   */
  _isLock() {
    return this.data.lock;
  },

  /**
   * 加锁
   */
  _addLock() {
    this.setData({
      lock: true,
    });
  },

  /**
   * 解锁
   */
  _removeLock() {
    this.setData({
      lock: false,
    });
  },

  /**
   * 是否还有更多数据
   */
  _hasMore() {
    return this.data.hasMore;
  },

  /**
   * 获取活动已接单主播列表
   */
  _getActivityAccounts: function () {
    if (this.data.id == undefined) return
    if (this._isLock() || !this.data.hasMore) return;
    this._addLock();
    activityModel.getActivityAccounts({
      id: this.data.id,
      page: this.data.page,
      size: this.data.size
    }).then(res => {
      this.data.page++;
      let hasNext = res.data.pageData.hasNext;
      this.data.list = this.data.list.concat(res.data.list);
      this.setData({
        hasMore: hasNext,
        list: this.data.list,
      });
      this._removeLock();
      wx.hideLoading();
    }).catch(exp => {
      this._removeLock();
      wx.hideLoading();
    })
  },

  /**
   * 获取播报类型
   */
  _getBroadcastTypes() {
    activityModel.getBroadcastType().then(res => {
      if (res.data) {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].id == this.data.data.broadcastType) {
            this.data.data.broadcastTypeName = res.data[i].name
            this.setData({
              data: this.data.data
            })
            break
          }
        }
      }
    }).catch(exp => {

    })
  },

  /**
   * 获取行业分类
   */
  _getLiveTypes: function () {
    mediaModel.getLiveTypes().then(res => {
      if (res.data) {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].id == this.data.data.liveType) {
            this.data.data.liveTypeName = res.data[i].name
            this.setData({
              data: this.data.data
            })
            break
          }
        }
      }
    }).catch(exp => {
      wx.showToast({
        title: '获取分类失败',
        icon: 'none',
      })
    })
  },
})