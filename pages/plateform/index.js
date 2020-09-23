const mediaModel = require('../../models/media.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    plateforms: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getMediaTypes()
  },

  /**
   * Item点击监听
   */
  onClickItem: function (event) {
    let item = event.currentTarget.dataset.item;

    this.setData({
      data: item
    })

    const pages = getCurrentPages()
    const prevPage = pages[pages.length - 2]
    prevPage.setData({
      media: item
    })
    wx.navigateBack()
  },

  /**
   * 获取媒体类型
   */
  _getMediaTypes: function () {
    mediaModel.getMediaTypes().then(res => {
      this.setData({
        plateforms: res.data
      })
    }).catch(exp => {

    })
  },
})