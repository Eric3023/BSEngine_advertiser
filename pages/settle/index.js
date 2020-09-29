const activityModel = require('../../models/activity.js')
const userModel = require('../../models/user.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance: 0,//余额
    totalPrice: 0,//订单价格
    discount: 0,//优惠
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      totalPrice: parseFloat(options.totalPrice),
    })

    this._getUserInfo()
  },

  /**
   * 支付监听
   */
  onPay: function () {

    if (this.data.totalPrice < 0) {
      wx.showModal({
        content: '消费金额不符合规范',
        showCancel: false,
        confirmText: '确定',
        confirmColor: '#fd8400',
      })
      return
    }

    if (this.data.totalPrice - this.data.discount > this.data.balance) {
      wx.showModal({
        content: '余额不足，请充值',
        showCancel: true,
        cancelText: '取消',
        confirmText: '充值',
        confirmColor: '#fd8400',

        success: res => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/recharge/recharge',
            })
          }
        }
      })
      return
    }

    this._payActivity();
  },

  /**
   * 获取用户信息
   */
  _getUserInfo() {
    userModel.getUserInfo().then(
      res => {
        let balance = res.data.totalAmount;
        this.setData({
          balance,
        });
      }
    ).catch(e => {
      console.log(e);
    });
  },

  /**
   * 活动支付
   */
  _payActivity: function () {
    activityModel.payActivity({ id: this.data.id }).then(res => {
      wx.showModal({
        content: '支付成功',
        showCancel: false,
        confirmText: '确定',
        confirmColor: '#fd8400',
        success: res => {
          if (res.confirm) {
            if (res.confirm) {
              const pages = getCurrentPages()
              const prevPage = pages[pages.length - 2]
              prevPage.setData({
                showFlush: true
              })
              wx.navigateBack()
            }
          }
        }
      })
    }).catch(exp => {
      wx.showModal({
        content: '支付失败，稍后重新支付',
        showCancel: false,
        confirmText: '确定',
        confirmColor: '#fd8400',
        success: res => {
          if (res.confirm) {
            const pages = getCurrentPages()
            const prevPage = pages[pages.length - 2]
            prevPage.setData({
              showFlush: true
            })
            wx.navigateBack()
          }
        }
      })
    })
  },

})