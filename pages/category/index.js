const mediaModel = require('../../models/media.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._initId(options)
    this._getLiveTypes()
  },

  /**
   * 点击Item
   */
  onClickItem: function (event) {
    let item = event.currentTarget.dataset.item;
    if (!item) {
      item = {}
    }

    this.setData({
      data: item
    })

    const pages = getCurrentPages()
    const prevPage = pages[pages.length - 2]
    prevPage.setData({
      industry: item
    })
    wx.navigateBack()
  },

  /**
   * 点击顶部搜索按钮
   */
  onSearch(event) {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  /**
   * 初始化Id
   */
  _initId: function (options) {
    let industryId = options.industryId
    this.data.data = {
      id: industryId
    }
    this.setData({
      data: this.data.data
    })
  },

  /**
   * 获取行业分类
   */
  _getLiveTypes: function () {
    mediaModel.getLiveTypes().then(res => {
      this.setData({
        list: res.data
      })
    }).catch(exp => {
      wx.showToast({
        title: '获取分类失败',
        icon: 'none',
      })
    })
  },
})