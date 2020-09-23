const config = require('../config/api.js')
const util = require('../utils/util.js');
const check = require('../models/check.js');

/**
 * 获取媒体账号
 */
function getMediaAccounts(data) {
  // return check.checkResult(util.request(config.mediaAccounts, {
  //   liveType: liveType,
  //   media: media,
  //   name: name,
  //   maxFans: maxFans,
  //   minFans: minFans,
  //   maxPrice: maxPrice,
  //   minPrice: minPrice,
  //   page: page,
  //   size: size,
  // }));

  return check.checkResult(util.request(config.mediaAccounts, data));
}

/**
 * 获取平台类型
 */
function getMediaTypes() {
  return check.checkResult(util.request(config.mediaType));
}

/**
 * 获取账号类型
 */
function getLiveTypes() {
  return check.checkResult(util.request(config.liveType));
}

module.exports = {
  getMediaAccounts: getMediaAccounts,
  getMediaTypes: getMediaTypes,
  getLiveTypes: getLiveTypes,
}