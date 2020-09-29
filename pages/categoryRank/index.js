// pages/category_rank/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //媒体平台
    meida: {},
    //行业分类
    industry: {},
    //价格
    price: {},
    //粉丝
    fans: {},
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
        let url = ''
        if (this.data.industry.id == undefined) {
          url = `/pages/category/index`
        } else {
          url = `/pages/category/index?industryId=${this.data.industry.id}`
        }
        wx.navigateTo({
          url: url,
        })
        break
      case '粉丝数':
        let fansUrl = ''
        if (this.data.fans.min == undefined) {
          fansUrl = '/pages/price/index?type=1'
        } else {
          fansUrl = `/pages/price/index?type=1&min=${this.data.fans.min}`
        }
        wx.navigateTo({
          url: fansUrl,
        })
      case '价格':
        let priceUrl = ''
        if (this.data.price.min == undefined) {
          priceUrl = '/pages/price/index?type=0'
        } else {
          priceUrl = `/pages/price/index?type=0&min=${this.data.price.min}`
        }
        wx.navigateTo({
          url: priceUrl,
        })
        break
      case '受众画像':
        break
    }
  },

  /**
   * 提交查询
   */
  onSubmit: function () {
    let url = '/pages/anchors/index?'
    let params = []
    if (this.data.media && this.data.media.id != undefined) {
      params.push(`mediaId=${this.data.media.id}`)
    }
    if (this.data.industry && this.data.industry.id != undefined) {
      params.push(`industryID=${this.data.industry.id}`)
    }
    if (this.data.price && this.data.price.min != undefined) {
      params.push(`priceMin=${this.data.price.min}`)
    }
    if (this.data.price && this.data.price.max != undefined) {
      params.push(`priceMax=${this.data.price.max}`)
    }
    if (this.data.fans && this.data.fans.min != undefined) {
      params.push(`fansMin=${this.data.fans.min}`)
    }
    if (this.data.fans && this.data.fans.max != undefined) {
      params.push(`fansMax=${this.data.fans.max}`)
    }
    url += params.join('&')
    wx.navigateTo({
      url: url,
    })
  }
})