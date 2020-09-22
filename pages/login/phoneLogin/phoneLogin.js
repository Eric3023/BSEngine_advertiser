const loginModel = require('../../../models/login.js')

/**
 * 手机号登录页面
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    password: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 手机号输入完成
   */
  onLogin(event) {
    var checkPhone = this._checkPhoneNum()
    if (!checkPhone) return

    var checkPassword = this._checkPassword()
    if (!checkPassword) return

    loginModel.login({
      username: this.data.phone,
      password: this.data.password,
    }).then(res => {
      //存储用户信息
      wx.setStorageSync('phone', res.data.userInfo.phone);
      wx.setStorageSync('token', res.data.token);
      wx.showToast({
        title: '登录成功',
        icon: 'none'
      })
      setTimeout(_ => wx.reLaunch({
        url: '../../../pages/index/index',
      }), 1000)
    }).catch(exp => {
      wx.showToast({
        title: '登录失败',
        icon: 'none'
      })
    })
  },

  /**
   * 注册
   */
  onRegist: function () {
    wx.navigateTo({
      url: '../../register/index',
    })
  },

  /**
   * 检查手机号
   */
  _checkPhoneNum() {
    var check = loginModel.checkPhone(this.data.phone)
    if (!check) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      })
      return false
    }
    return true
  },

  /**
 * 检查手机号
 */
  _checkPassword() {
    if (!this.data.password) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
      return false
    }
    return true
  },

})