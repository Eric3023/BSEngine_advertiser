const mediaModel = require('../../models/media.js')

Page({
  data: {
    //搜索关键词
    keyword: '',
    //搜索页码
    page: 1,
    //是否显示搜索历史和热门搜索
    show: true,
    //搜索记录
    history: [],

    page: 1,
    size: 20,
    lock: false,
    hasMore: true,
    //搜索结果
    list: [],
  },

  onLoad: function (options) {
    this._loadHis();//载入搜索历史记录
  },

  onReachBottom: function () {
    this._getActivities()
  },

  /**
   * 确认搜索
   */
  onConfirm: function (event) {
    let value = event.detail.value
    //搜索内容不为空 
    if (value) {
      this._addHistory(value)
      this._searchList(value)
      this.setData({
        show: false
      })
    }
    //搜索内容不为空 
    else {
      wx.showToast({
        icon: 'none',
        title: '搜索内容不能为空',
      })
    }
  },

  /**
   * 清空搜索
   */
  onClear: function (event) {
    this.setData({
      show: true
    })
  },

  /**
   * 清空搜素历史
   */
  onClearHistory: function (event) {
    this._clearHistory()
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
   * 加载搜索历史
   */
  _loadHis() {
    let history = wx.getStorageSync("searchHistory");
    if (Array.isArray(history)) {
      this.setData({
        history: history
      })
    }
  },

  /**
   * 添加历史记录
   */
  _addHistory: function (value) {
    let history = wx.getStorageSync("searchHistory");
    if (!Array.isArray(history)) {//判断本地缓存是否有数组，如果没有，则新建
      this.setData({
        history: [value]//更新历史显示列表
      })
      wx.setStorage({//更新存储的历史
        key: 'searchHistory',
        data: this.data.history
      })
      return;
    }

    //如果存在了，则读取本地缓存
    if (history !== null) {
      let num = history.indexOf(value);
      if (num != -1) {
        // 删除已存在后重新插入至数组
        history.splice(num, 1);
        history.unshift(value);
      } else {
        history.unshift(value);
      }
    }

    if (history.length >= 50) {
      history.splice(49, 1);
    }

    //存储搜索记录
    wx.setStorage({
      key: "searchHistory",
      data: history
    })

    this.setData({
      history: history
    })

  },

  /**
   * 清空历史记录
   */
  _clearHistory: function () {
    this.setData({
      history: []
    });
    wx.clearStorage("searchHistory");
  },

  /**
   * 修改检索关键词，重新搜索
   */
  _searchList(value) {
    //重新搜索，页码和搜索结果需要重置
    this.data.page = 1;
    this.data.siteData = [];
    //修改搜索框的显示内容
    this.setData({
      keyword: value
    });
    this.getSearchResult(value);
  },

  /**
   * 不修改检索关键词，加载更多结果
   */
  _searchMoreList(value) {
    //加载更多，页码递增
    this.data.page++;
    this.getSearchResult(value);
  },

  /**
  * 修改检索关键词，重新搜索
  */
  _searchList(value) {
    //重新搜索，页码和搜索结果需要重置
    this._reset(value)
    this._getActivities(value);
  },

  /**
   * 重置数据
   */
  _reset(value) {
    this.setData({
      keyword: value,
      list: [],
      page: 1,
      lock: false,
      hasMore: true,

      leftData: [],
      rightData: [],
      leftHeight: 0,
      rightHeight: 0,
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
   * 获取搜索结果
   */
  _getActivities() {
    if (this._isLock() || !this.data.hasMore) return;
    this._addLock();
    wx.showLoading();
    mediaModel.getMediaAccounts({
      name: this.data.keyword,
      page: this.data.page,
      size: this.data.size,
    }).then(
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