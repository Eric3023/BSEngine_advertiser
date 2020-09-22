const config = require('../config/api.js')
const util = require('../utils/util.js');
const check = require('../models/check.js');

/**
 * 校验手机号是否合法 
 */
function checkPhone(value) {
  value = value.trim();
  if (!value) {
    return false
  } else if (value.trim().length != 11
    || ! /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/.test(value)) {
    return false
  } else {
    return true
  }
}

/**
 * 获取手机验证码
 */
function regCaptcha(mobile) {
  return check.checkResult(util.request(config.regCaptcha, { mobile: mobile }, 'POST'));
}

/**
 * 用户注册
 */
function register({ type = 1, username, password, mobile, code, wxCode }) {
  return check.checkResult(util.request(config.register,
    {
      type: type,
      password: password,
      mobile: mobile,
      code: code,
      wxCode: wxCode,
    },
    'POST'));
}

/**
 * 手机号登录
 */
function login({ type = 1, username, password }) {
  return check.checkResult(util.request(config.login,
    {
      type: type,
      username: username,
      password: password,
    },
    'POST'));
}

/**
 * 修改密码
 */
function changePassword({ password, mobile, code }) {
  return check.checkResult(util.request(config.changePassword,
    {
      mobile: mobile,
      password: password,
      code: code,
    },
    'POST'));
}

module.exports = {
  checkPhone: checkPhone,
  regCaptcha: regCaptcha,
  register: register,
  login: login,
  changePassword: changePassword,
}