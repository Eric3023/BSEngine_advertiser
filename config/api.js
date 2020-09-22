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

  //获取主播账号
  mediaAccounts: BaseApi + '/api/mediaAccount/getListForAdvertisers',
  //获取账号类型
  liveType: BaseApi + '/api/mediaAccount/getLiveTypes',



  //图片根地址
  BaseImgApi: BaseApi,
  //行业分类
  LocationCategory: WxApiRoot + 'index/allCategory',
  //周边用户数
  AroundUsers: WxApiRoot + 'index/userNums',
  //获取投放广告位
  AdPlaces: WxApiRoot + 'advertising/getAdPlaces',
  //车型列表
  CarTypes: WxApiRoot + 'advertising/getCarTypes',
  //投放模板
  Templates: WxApiRoot + 'advertising/getTemplates',
  //投放
  DoAdvertising: WxApiRoot + 'advertising/doAdvertising',
  //上传图片接口
  Upload: WxApiRoot + 'storage/upload',
  //充值记录接口
  PayRecord: WxApiRoot + 'pay/payRecord',
  //用户信息接口
  UserInfo: WxApiRoot + 'user/index',
  //订单列表
  Order: WxApiRoot + 'advertising/getAdvertisings',
  //企业认证
  Author: WxApiRoot + 'ocr/auth',
  //优惠券列表
  Coupons: WxApiRoot + 'coupon/mylist',
  //代开发票列表
  NoUserInvoice: WxApiRoot + 'pay/noUseInvoice',
  //开具发票
  OpenInvoice: WxApiRoot + 'pay/openInvoice',
  //投放详情
  ThrowDetail: WxApiRoot + 'advertising/getAdvertisingInfo',
  //获取模板预览图片
  PreviewImage: WxApiRoot + 'advertising/getTemplateImgUrl',
  //投放价格表
  AllPrices: WxApiRoot + 'advertising/getAllPrices',
  //删除订单
  delOrder: WxApiRoot + '/advertising/delAdvertising',


  //用户余额接口
  UserBalance: WxApiRoot + 'recharge/userBalance',

  //对公账户接口
  BankAccount: WxApiRoot + 'recharge/bankAccount',

  //确认充值接口
  RechargeConfirm: WxApiRoot + 'recharge/recharge',

  RechargePrepay: WxApiRoot + 'pay/prepay', //订单的预支付会话

};