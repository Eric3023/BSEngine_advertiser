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
 * 更新活动
 */
function updateActivity(data) {
  return check.checkResult(util.request(config.updateActivity, data, 'POST'));
}

/**
 * 删除活动
 */
function delActivity({ id }) {
  return check.checkResult(util.request(config.delActivity, { aid: id }, 'POST'));
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

/**
 * 获取活动详情
 */
function getActivityDetail({ id }) {
  return check.checkResult(util.request(config.activityDetail, { aid: id }));
}

/**
 * 获取活动已接单主播列表
 */
function getActivityAccounts({ id, page = 0, size = 10 }) {
  return check.checkResult(util.request(config.activityAccounts, {
    aid: id,
    page: page,
    size: size
  }));
}

module.exports = {
  addActivity: addActivity,
  updateActivity: updateActivity,
  delActivity: delActivity,
  getBroadcastType: getBroadcastType,
  getActivityList: getActivityList,
  getActivityDetail: getActivityDetail,
  getActivityAccounts: getActivityAccounts,
}