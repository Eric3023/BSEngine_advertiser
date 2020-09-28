let activityModel = require('../../models/activity.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    orders: [],

    status: 0,

    page: 1,
    size: 20,
    lock: false,
    hasMore: true,

    touchStartTime: 0,
    touchEndTime: 0,

    types: [
      {
        id: 0,
        icon: '/img/activity/state0.png'
      },
      {
        id: 1,
        icon: '/img/activity/state1.png'
      },
      {
        id: 2,
        icon: '/img/activity/state2.png'
      },
      {
        id: 3,
        icon: '/img/activity/state3.png'
      },
      {
        id: 4,
        icon: '/img/activity/state4.png'
      },
      {
        id: 5,
        icon: '/img/activity/state5.png'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getOrders();
  },

  /**
   * 滑动到页面底部
   */
  onReachBottom: function () {
    this._getOrders();
  },

  /**
   * 查看全部
   */
  onAll: function () {
    wx.navigateTo({
      url: '/pages/consum/index',
    })
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
   * 修改列表中的订单状态
   */
  onChangeType: function (event) {
    let index = event.currentTarget.dataset.index;
    this._reset(index);
    this._getOrders()
  },

  /**
   * 点击订单列表，进入订单详情
   */
  onClickItem(event) {
    let item = event.currentTarget.dataset.item

    switch (item.status) {
      //待审核
      case 0:
        wx.navigateTo({
          url: `/pages/detail2/index?id=${item.id}`,
        })
        return
      //待支付
      case 1:
        wx.navigateTo({
          url: `/pages/detail2/index?id=${item.id}`,
        })
        return
      //审核失败
      case 5:
        wx.navigateTo({
          url: `/pages/detail2/index?id=${item.id}`,
        })
        return
      //已支付
      case 2:
        wx.navigateTo({
          url: `/pages/detail/index?id=${item.id}`,
        })
        return
      //投放中
      case 3:
        wx.navigateTo({
          url: `/pages/detail/index?id=${item.id}`,
        })
        return
      //已完成
      case 4:
        wx.navigateTo({
          url: `/pages/detail/index?id=${item.id}`,
        })
        return
    }
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
   * 获取我的订单列表
   */
  _getOrders() {
    if (this._isLock() || !this.data.hasMore) return;
    this._addLock();
    wx.showLoading();
    activityModel.getActivityList({
      status: this.data.status,
      page: this.data.page,
      size: this.data.size
    }).then(
      res => {
        this.data.page++;
        let hasNext = res.data.pageData.hasNext;
        this.data.orders = this.data.orders.concat(res.data.list);
        this.setData({
          hasMore: hasNext,
          orders: this.data.orders,
          extras: res.data.extras,

          succNum: res.data.extras.succNum,
          execingNum: res.data.extras.execingNum,
          toExecNum: res.data.extras.toExecNum,
        });
        this._removeLock();
        wx.hideLoading();
      }, error => {
        this._removeLock();
        wx.hideLoading();
      }
    );
  },
})