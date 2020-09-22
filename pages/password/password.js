const loginModel = require('../../models/login.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: '',
    checkPassword: '',
    code: '',

    time: 0,
    timeShow: false,
    timePeriod: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getPhone()
  },

  /**
   * 检查密码
   */
  onCheckPassword: function (event) {
    this._checkPassword()
  },

  /**
   * 获取验证码
   */
  onSendMessage: function () {
    var check = loginModel.checkPhone(this.data.phone)
    if (!check) {
      wx.showToast({
        title: '未获取到手机号，请重新登录',
        icon: 'none'
      })
      return
    }

    loginModel.regCaptcha(this.data.phone).then(res => {
      this.setData({
        time: 60,
        timeShow: true
      })

      this.data.timePeriod = setInterval(this._changeTime, 1000)
    }).catch(exp => {
      console.log(exp);

      wx.showToast({
        title: '验证码获取失败',
        icon: 'none'
      })
    })
  },

  /**
   * 提交
   */
  onSubmit: function () {
    var check = this._checkPassword()
    if (!check) return
    loginModel.changePassword({
      mobile: this.data.phone,
      password: this.data.password,
      code: this.data.code
    }).then(res => {
      wx.showToast({
        title: '密码修改成功',
        icon: 'none'
      })
      setTimeout(_ => wx.navigateBack(), 1000)
    }).catch(exp => {
      wx.showToast({
        title: '密码修改失败',
        icon: 'none'
      })
    })
  },

  /**
   * 获取手机号
   */
  _getPhone: function () {
    this.setData({
      phone: wx.getStorageSync('phone')
    })
  },

  /**
   * 修改倒计时
   */
  _changeTime: function () {
    this.data.time--
    if (this.data.time === 0) {
      clearInterval(this.data.timePeriod)
      this.setData({
        time: this.data.time,
        timeShow: false
      })
    } else {
      this.setData({
        time: this.data.time
      })
    }
  },

  /**
   * 检查两次输入密码是否相同
   */
  _checkPassword: function () {
    if (!this.data.checkPassword || !this.data.password) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      })
      return false
    }

    if (this.data.checkPassword === this.data.password) {
      return true
    }

    wx.showToast({
      title: '两次密码输入不一致',
      icon: 'none'
    })
    return false
  },

})