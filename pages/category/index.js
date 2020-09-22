const mediaModel = require('../../models/media.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    position: -1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getLiveTypes()
  },

  /**
   * 点击Item
   */
  onClickItem: function (event) {
    let index = event.currentTarget.dataset.index;
    if (index >= 0 && index < this.data.list.length) {
      this.setData({
        position: index
      })

      let item = this.data.list[index]
      wx.navigateTo({
        url: `/pages/anchors/index?liveType=${item.id}`,
      })
    } else {
      this.setData({
        position: -1
      })

      wx.navigateTo({
        url: `/pages/anchors/index`,
      })
    }
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