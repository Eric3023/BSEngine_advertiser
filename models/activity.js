const config = require('../config/api.js')
const util = require('../utils/util.js');
const check = require('./check.js');

/**
 * 添加活动
 */
function addActivity(data) {
  return check.checkResult(util.request(config.addActivity, data, 'POST'));
}

/**
 * 获取播报类型
 */
function getBroadcastType() {
  return check.checkResult(util.request(config.broadcastType));
}

module.exports = {
  addActivity: addActivity,
  getBroadcastType: getBroadcastType,
}