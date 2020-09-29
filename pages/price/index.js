// pages/price/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //0: 价格；1：粉丝数
    type: 0,
    fans: [
      {
      },
      {
        min: 1,
        max: 1000,
      },

      {
        min: 1001,
        max: 5000,
      },

      {
        min: 5001,
        max: 10000,
      },

      {
        min: 10001,
        max: 50000,
      },

      {
        min: 50001,
        max: 100000,
      },

      {
        min: 100000,
      },

    ],
    prices: [
      {

      },
      {
        min: 1,
        max: 500,
      },

      {
        min: 501,
        max: 1000,
      },

      {
        min: 1001,
        max: 1500,
      },

      {
        min: 1501,
        max: 2000,
      },

      {
        min: 2000,
      },

    ],

    data: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: parseInt(options.type)
    })

    this._initId(options)
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
    if (this.data.type == 0) {
      prevPage.setData({
        price: item,
      })
    } else if (this.data.type == 1) {
      prevPage.setData({
        fans: item,
      })
    }
    wx.navigateBack()
  },

  /**
 * 初始化Id
 */
  _initId: function (options) {
    let min = options.min
    this.data.data = {
      min: min
    }

    this.setData({
      data: this.data.data
    })
  },
})