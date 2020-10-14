let userModel = require('../../models/user.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      { icon: "/img/mine/icon_password.png", title: "修改密码" },
      { icon: "/img/mine/icon_mine_collection.jpg", title: "关于我们" },
      { icon: "/img/mine/icon_mine_setting.png", title: "退出登录" }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 退出登录
   */
  loginOut: function (event) {
    wx.showModal({
      content: '确认需要退出登录？',
      success(res) {
        if (res.confirm) {
          userModel.loginOut();
          wx.reLaunch({
            url: '/pages/mine/mine',
            // success: res => {
            //   var page = getCurrentPages().pop();
            //   if (page == undefined || page == null) return;
            //   page._resetUserInfo();
            // }
          })
        }
      }
    })
  },

  /**
   * 点击了设置Item
   */
  onClickItem: function (event) {
    let value = event.currentTarget.dataset.item;
    console.log(value);
    switch (value) {
      case '修改密码':
        wx.navigateTo({
          url: '/pages/password/password',
        })
        break;
      case '关于我们':
        wx.navigateTo({
          url: '/pages/about/about',
        })
        break;
      case '退出登录':
        this.loginOut();
        break;
      default:
        break;
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})