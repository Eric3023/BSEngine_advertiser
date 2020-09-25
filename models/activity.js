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

/**
 * 获取活动列表
 */
function getActivityList({ status, page, size }) {
  let param = {
    page: page,
    size: size,
  }
  if (status != undefined) {
    param.status = status
  }
  return check.checkResult(util.request(config.adActivitys, param));
}

module.exports = {
  addActivity: addActivity,
  getBroadcastType: getBroadcastType,
  getActivityList: getActivityList,
}