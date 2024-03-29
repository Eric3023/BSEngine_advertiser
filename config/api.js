// 本机开发API地址
// var BaseApi = 'http://127.0.0.1:8070/';
// 局域网开发API地址
var BaseApi = 'http://192.168.1.105:9000/';
// var BaseApi = 'http://192.168.1.19:8070/';
// 线上云平台api地址
// var BaseApi = "https://zt.ottauto.tv/"

var WxApiRoot = BaseApi + 'wx/';

module.exports = {

  //微信登录
  AuthLoginByWeixin: WxApiRoot + 'auth/login_by_weixin',
  //根据手机号登录
  AuthPhoneLoginByWeixin: WxApiRoot + 'auth/phone_login_by_weixin',

  //首页Banner
  Banner: WxApiRoot + 'index/banner',

  //手机验证码
  regCaptcha: BaseApi + '/wx/auth/regCaptcha',
  //手机号注册
  register: BaseApi + '/wx/auth/register',
  //手机号登录
  login: BaseApi + '/wx/auth/login',
  //手机号登录
  changePassword: BaseApi + '/wx/auth/reset',
  //分享验证码
  shareUrl: BaseApi + '/wx/user/getSharedUrl',
  //用户信息接口
  UserInfo: BaseApi + '/wx/user/advIndex',

  //获取主播账号
  mediaAccounts: BaseApi + '/api/mediaAccount/getListForAdvertisers',
  //获取平台类型
  mediaType: BaseApi + '/api/mediaAccount/getMedias',
  //获取账号类型
  liveType: BaseApi + '/api/mediaAccount/getLiveTypes',

  //添加活动
  addActivity: BaseApi + '/api/activity/addActivity',
  //更新活动
  updateActivity: BaseApi + '/api/activity/updateActivity',
  //删除活动
  delActivity: BaseApi + '/api/activity/delActivity',
  //暂停活动
  pauseActivity: BaseApi + '/api/activity/pause',
  //继续活动
  continueActivity: BaseApi + '/api/activity/continueActivity',
  //活动播报类型
  broadcastType: BaseApi + '/api/mediaAccount/getBroadcastTypes',
  //我的活动
  adActivitys: BaseApi + '/api/activity/getAdActivitys',
  //活动详情
  activityDetail: BaseApi + '/api/activity/getActivityDeatil',
  //活动已接单主播列表
  activityAccounts: BaseApi + '/api/activity/getMediaAccountListByAid',
  //活动结算
  payActivity: BaseApi + '/api/activity/payActivity',

  //图片根地址
  BaseImgApi: BaseApi,
  //上传图片接口
  Upload: WxApiRoot + 'storage/upload',
  //充值记录接口
  PayRecord: WxApiRoot + 'pay/payRecord',
  //企业认证
  Author: WxApiRoot + 'ocr/auth',
  //优惠券列表
  Coupons: WxApiRoot + 'coupon/mylist',
  //待开发票列表
  NoUserInvoice: WxApiRoot + 'pay/noUseInvoice',
  //开具发票
  OpenInvoice: WxApiRoot + 'pay/openInvoice',

  //用户余额接口
  UserBalance: WxApiRoot + 'recharge/userBalance',

  //对公账户接口
  BankAccount: WxApiRoot + 'recharge/bankAccount',

  //确认充值接口
  RechargeConfirm: WxApiRoot + 'recharge/recharge',

  RechargePrepay: WxApiRoot + 'pay/prepay', //订单的预支付会话

};