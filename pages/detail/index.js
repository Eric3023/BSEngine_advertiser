const activityModel = require('../../models/activity.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    data: {},
    list: []
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
   * 获取活动详情
   */
  _getActivityDetail: function () {
    if (this.data.id == undefined) return
    activityModel.getActivityDetail({ id: this.data.id }).then(res => {
      this.setData({
        data: res.data
      })
    }).catch(exp => {

    })
  },

  /**
   * 获取活动已接单主播列表
   */
  _getActivityAccounts: function () {
    if (this.data.id == undefined) return
    activityModel.getActivityAccounts({ id: this.data.id }).then(res => {
      this.setData({
        list: res.data.list
      })
    }).catch(exp => {

    })
  }
})