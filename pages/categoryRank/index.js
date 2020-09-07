// pages/category_rank/index.js
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
   * 点击了Item
   */
  onClickItem: function (event) {
    let type = event.currentTarget.dataset.type
    switch (type) {
      case '平台分类':
        wx.navigateTo({
          url: '/pages/plateform/index',
        })
        break
      case '常见分类':
        wx.navigateTo({
          url: '/pages/category/index',
        })
        break
      case '粉丝数':
        wx.navigateTo({
          url: '/pages/price/index',
        })
        break
      case '价格':
        wx.navigateTo({
          url: '/pages/price/index',
        })
        break
      case '受众画像':
        break
    }
  },
})