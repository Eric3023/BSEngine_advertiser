// components/search_view/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

    /**
     * 搜索
     */
    onSearch(event) {
      this.triggerEvent('search');
    },

    /**
     * 菜单
     */
    onMenu(event) {
      this.triggerEvent('menu');
    }
  }
})
