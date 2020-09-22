// components/search/search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: Boolean,
    keyword: String,
    placeholder: String,
    history: Array,
    hot: Array,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 确认搜索
     */
    onConfirm: function (event) {
      this._onConfirm(event.detail.value)
    },

    /**
     * 清除搜索内容
     */
    onClear: function () {
      this.setData({
        keyword: ''
      });
      this.triggerEvent("onClear");
    },

    /**
     * 点击搜索历史
     */
    onHistoryClick: function (event) {
      this._onConfirm(event.currentTarget.dataset.value)
    },

    /**
     * 点击热门搜索
     */
    onHotClick: function (event) {
      this._onConfirm(event.currentTarget.dataset.value)
    },

    /**
     * 清空历史记录
     */
    onClearHistory: function (event) {
      this.triggerEvent("onClearHistory");
    },

    /**
     * 确认搜索
     */
    _onConfirm: function (value) {
      this.setData({
        keyword: value,
      })
      this.triggerEvent("onConfirm", { value: value });
    }
  }
})
