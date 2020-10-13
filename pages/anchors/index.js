const mediaModel = require('../../models/media.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    size: 20,
    lock: false,
    hasMore: true,
    //搜索结果
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.mediaId = options.mediaId
    this.data.industryID = options.industryID
    this.data.priceMin = options.priceMin
    this.data.priceMax = options.priceMax
    this.data.fansMax = options.fansMax
    this.data.fansMin = options.fansMin

    this._getMedias()
  },

  onReachBottom: function () {
    this._getMedias()
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
    wx.navigateBack()
  },

  /**
   * 查看主播主页
   */
  onClickItem: function(event){
    let item = event.currentTarget.dataset.item
    let url = item.indexUrl
    wx.navigateTo({
      url: `/pages/webview/webview?url=${url}`,
    })
  },

  /**
     * 重置数据
     */
  _reset(value) {
    this.setData({
      list: [],
      page: 1,
      lock: false,
      hasMore: true,
    });
  },

  /**
   * 是否加锁（正在请求数据）
   */
  _isLock() {
    return this.data.lock;
  },

  /**
   * 加锁
   */
  _addLock() {
    this.setData({
      lock: true,
    });
  },

  /**
   * 解锁
   */
  _removeLock() {
    this.setData({
      lock: false,
    });
  },

  /**
   * 是否还有更多数据
   */
  _hasMore() {
    return this.data.hasMore;
  },

  /**
   * 获取媒体账号
   */
  _getMedias: function () {
    if (this._isLock() || !this.data.hasMore) return;

    let param = {
      page: this.data.page,
      size: this.data.size,
    }

    if (this.data.mediaId != undefined) {
      param.media = this.data.mediaId
    }
    if (this.data.industryID != undefined) {
      param.liveType = this.data.industryID
    }
    if (this.data.priceMin != undefined) {
      param.minPrice = this.data.priceMin
    }
    if (this.data.priceMax != undefined) {
      param.maxPrice = this.data.priceMax
    }
    if (this.data.fansMax != undefined) {
      param.minFans = this.data.fansMin
    }
    if (this.data.fansMin != undefined) {
      param.maxFans = this.data.fansMax
    }

    wx.showLoading()
    mediaModel.getMediaAccounts(param).then(
      res => {
        console.log(res);

        this.data.page++;
        let hasNext = res.data.pageData.hasNext;
        this.data.list = this.data.list.concat(res.data.list);
        this.setData({
          hasMore: hasNext,
          list: this.data.list,
        });
        this._removeLock();
        wx.hideLoading();
      }, error => {
        this._removeLock();
        wx.hideLoading();
      }
    );
  },
})