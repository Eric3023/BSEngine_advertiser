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
    this.data.liveType = options.liveType

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
    wx.navigateTo({
      url: '/pages/category/index',
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
    let param = {
      page: this.data.page,
      size: this.data.size,
    }

    if (this.data.liveType != undefined) {
      param.liveType = this.data.liveType
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