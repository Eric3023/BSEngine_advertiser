const loginModel = require('../../models/login.js')
const homeModel = require('../../models/home.js')

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

    wxCode: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getWxCode()
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
        title: '手机号格式不正确',
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
   * 注册
   */
  onRegist: function () {
    //手机号校验
    var checkPhoneNum = this._checkPhoneNum()
    if (!checkPhoneNum) return
    //密码检查
    var checkPassword = this._checkPassword()
    if (!checkPassword) return
    //验证码校验
    var checkCode = this._checkCode()
    if (!checkCode) return

    //获取微信code
    wx.login().then(res => {
      this.data.wxCode = res.code
      return loginModel.register({
        password: this.data.password,
        mobile: this.data.phone,
        code: this.data.code,
        wxCode: this.data.wxCode,
      })
    }).then(res => {
      wx.showToast({
        title: '注册成功',
        icon: 'none'
      })
      setTimeout(_ => wx.navigateBack(), 1000)
    }).catch(exp => {
      wx.showToast({
        title: exp.errmsg,
        icon: 'none'
      })
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

  /**
   * 检查验证码
   */
  _checkCode: function () {
    if (!this.data.code) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      })
      return false
    }
    return true
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
   * 获取微信code
   */
  _getWxCode: function () {
    //获取微信code
    wx.login({
      complete: (res) => {
        this.data.wxCode = res.code
      },
    })
  },
})