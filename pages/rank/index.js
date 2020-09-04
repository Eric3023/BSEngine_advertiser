// pages/anchors/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   * 点击顶部分类按钮
   */
  onMenu(event) {
    wx.navigateTo({
      url: '/pages/category/index',
    })
  },
})