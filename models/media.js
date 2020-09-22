const config = require('../config/api.js')
const util = require('../utils/util.js');
const check = require('../models/check.js');

/**
 * 获取媒体账号
 */
function getMediaAccounts({ liveType, media, name, maxPrice, minPrice, maxFans, minFans, page, size }) {
  return check.checkResult(util.request(config.mediaAccounts, {
    liveType: liveType,
    media: media,
    name: name,
    maxFans: maxFans,
    minFans: minFans,
    maxPrice: maxPrice,
    minPrice: minPrice,
    page: page,
    size: size,
  }));
}

module.exports = {
  getMediaAccounts: getMediaAccounts,
}