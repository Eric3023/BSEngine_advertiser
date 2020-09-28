const activityModel = require('../../models/activity.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    this._getOrders()
  },

  onReachBottom: function () {
    this._getOrders()
  },


  /**
   * 点击Item
   */
  onClickItem: function(event){
    if (this.data.touchEndTime - this.data.touchStartTime > 350) return;
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
   * 长按订单，删除
   */
  onLongClickItem(event) {
    let item = event.currentTarget.dataset.item
    let index = event.currentTarget.dataset.index
    //待审核、待支付、审核失败，长按删除
    if (item.status == 0 || item.status == 1 || item.status == 5) {
      wx.showModal({
        content: '是否需要删除订单',
        showCancel: true,
        cancelText: '取消',
        confirmText: '删除',
        confirmColor: '#fd8400',

        success: res => {
          if (res.confirm) {
            this._delActivity(item.id, index)
          }
        }
      })
    }
    //投放中，长按暂停
    else if (item.status == 3) {
      wx.showModal({
        content: '是否需要暂停订单',
        showCancel: true,
        cancelText: '取消',
        confirmText: '暂停',
        confirmColor: '#fd8400',

        success: res => {
          if (res.confirm) {
            this._paudeActivity(item.id, index)
          }
        }
      })
    }
    //暂停中，长按继续
    else if (item.status == 6) {
      wx.showModal({
        content: '是否继续执行订单',
        showCancel: true,
        cancelText: '取消',
        confirmText: '确定',
        confirmColor: '#fd8400',

        success: res => {
          if (res.confirm) {
            this._continueActivity(item.id, index)
          }
        }
      })
    }
  },

  /**
   * 去支付
   */
  onSettle: function(){
    wx.navigateTo({
      url: '/pages/settle/index',
    })
  },

  /**
  * 重置数据
  */
  _reset(status) {
    this.setData({
      list: [],
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
   * 获取待接单列表
   */
  _getOrders: function () {
    if (this._isLock() || !this.data.hasMore) return;
    this._addLock();
    wx.showLoading();
    activityModel.getActivityList({
      page: this.data.page,
      size: this.data.size,
    }).then(
      res => {
        this.data.page++;
        let hasNext = res.data.pageData.hasNext;
        this.data.list = this.data.list.concat(res.data.list);
        this.setData({
          hasMore: hasNext,
          list: this.data.list,
        });
        this._removeLock();
        wx.hideLoading();
      }, error => {
        this._removeLock();
        wx.hideLoading();
      }
    );
  },

  /**
   * 删除活动
   */
  _delActivity: function (id, index) {
    activityModel.delActivity({ id: id }).then(res => {
      wx.showToast({
        title: '删除成功',
        icon: 'none',
      })
      this.data.list.splice(index, 1)
      this.setData({
        list: this.data.list
      })
    }).catch(exp => {
      wx.showToast({
        title: '删除失败',
        icon: 'none',
      })
    })
  },

    /**
   * 暂停活动
   */
  _paudeActivity: function (id, index) {
    activityModel.pauseActivity({ id: id }).then(res => {
      wx.showToast({
        title: '暂停成功',
        icon: 'none',
      })
      this.data.list[index].status = 6//状态修改为暂停中
      this.setData({
        list: this.data.list
      })
    }).catch(exp => {

      wx.showToast({
        title: '暂停失败',
        icon: 'none',
      })
    })
  },

  /**
   * 继续活动
   */
  _continueActivity: function (id, index) {
    activityModel.continueActivity({ id: id }).then(res => {
      wx.showToast({
        title: '操作成功',
        icon: 'none',
      })
      this.data.list[index].status = 3//状态修改为投放中
      this.setData({
        list: this.data.list
      })
    }).catch(exp => {
      wx.showToast({
        title: '操作失败',
        icon: 'none',
      })
    })
  }
})