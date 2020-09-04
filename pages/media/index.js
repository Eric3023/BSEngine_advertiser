Page({

  /**
   * 页面的初始数据
   */
  data: {
    plateforms: [
      {
        id: 10001,
        icon: "/img/plateform/background_video.png",
        name: '视频\n直播媒体',
      },
      {
        id: 10002,
        name: '微信公众号',
      },
      {
        id: 10003,
        name: '微信朋友圈',
      },

      {
        id: 10004,
        name: '小红书',
      },
      {
        id: 10005,
        name: '微博',
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * Item点击监听
   */
  onClickItem: function (event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/rank/index',
    })
  },

  /**
   * 搜索
   */
  onSearch: function (event) {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  /**
   * 分类
   */
  onMenu: function (event) {
    wx.navigateTo({
      url: '/pages/plateform/index',
    })
  },
})