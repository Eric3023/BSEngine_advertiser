const userModel = require('../../models/user.js');
const UserInfoHelper = require('../../utils/userInfo.js')
const config = require('../../config/api.js')

const userInfoHelper = new UserInfoHelper();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    authored: 0,//0:未认证；1：认证中；2：已认证
    hasLogin: false,
    balance: '0.00',
    likesNum: 0,
    user_info: {
      uicon: "",
      uid: "",
      flag: false,//是否缓存用户信息
    },
    user_datas: [
      { icon: "/img/mine/icon_order_ad.png", title: "我的订单", info: '待支付订单' },
      { icon: "/img/mine/icon_recharge_ad.png", title: "充值记录" },
      { icon: "/img/mine/icon_information_ad.png", title: "消息通知", num: 10 },
      { icon: "/img/mine/icon_setting_ad.png", title: "设置" }
    ]
  },

  /**
   * 进入下级页面
   */
  onClick: function (event) {
    let index = event.currentTarget.dataset.index;
    switch (index) {
      case '我的喜欢':
        wx.navigateTo({
          url: '/pages/collection/collection?title=我的喜欢',
        })
        break;
      case '已经播报':
        wx.navigateTo({
          url: '/pages/tasks/tasks',
        })
        break;
    }
  },

  /**
   * 进入下级页面
   */
  onClickItem(event) {
    let index = event.currentTarget.dataset.title;
    console.log(`index:${event}`);
    switch (index) {
      case '我的订单':
        wx.navigateTo({
          url: '/pages/orders/index',
        })
        break;
      case '充值记录':
        wx.navigateTo({
          url: '/pages/recharge_record/record',
        })
        break;
      case '消息通知':
        wx.navigateTo({
          url: `/pages/informations/index`,
        })
        break;
      case '设置':
        wx.navigateTo({
          url: '/pages/setting/setting',
        })
        break;
      default:
        let title = '进入【' + event.detail.title + '】页面';
        wx.showToast({
          title: title,
          icon: 'none'
        })
        break
    }
  },

  /**
   * 生命周期函数
   */
  onLoad: function (option) {
    this._resetUserInfo();
    this._checkLogin();
  },

  onRecharge: function () {
    wx.navigateTo({
      url: '/pages/recharge/recharge',
    })
  },

  onShow() {
    if (this.data.hasLogin === true) {
      this._getUserInfoFromNet();
    }
  },

  /**
   * 转发
   */
  onShareAppMessage: function () {

  },

  /**
   * 点击Button，获取用户信息
   */
  getWxUserInfo(event) {
    console.log(event);
    var that = this
    // 声明一个变量接收用户授权信息
    var userinfo = event.detail.event.userInfo;
    if (userinfo != undefined) {
      that.setData({
        user_info: {
          uicon: userinfo.avatarUrl,
          uid: userinfo.nickName,
          flag: true,
        }
      })

      //存储用户信息
      wx.setStorageSync('uicon', userinfo.avatarUrl);
      wx.setStorageSync('uid', userinfo.nickName);
    }
  },

  /**
   * 检查登录
   */
  _checkLogin() {
    let token = wx.getStorageSync("token");
    let phone = wx.getStorageSync("phone");
    //必须登录才能查看
    console.log(token);
    if (!token || token == '') {
      wx.showModal({
        title: "提示",
        content: "登录后体验更多功能",
        cancelText: "取消",
        confirmText: "去登录",
        success(res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '/pages/login/login',
            })
          } else if (res.cancel) {
            wx.reLaunch({
              url: '/pages/index/index',
            })
          }
        }
      });
      //未登录不显示头像
      this._resetUserInfo()
    } else {
      this.setData({
        phone: phone,
        hasLogin: true
      });
      //登录之后才显示头像
      this._getStorageUserInfo();
    }
  },

  /**
   * 获取用户信息
   */
  _getUserInfoFromNet() {
    userModel.getUserInfo().then(
      res => {
        let balance = res.data.totalAmount;
        balance = balance.toFixed(2);
        let likesNum = res.data.likesNum
        this.setData({
          balance,//账号余额
          likesNum,//是否认证
        });
      }
    ).catch(e => {
      console.log(e);
    });
  },

  /**
   * 重置UserInfo
   */
  _resetUserInfo() {
    this.setData({
      user_info: {
        uicon: "",
        uid: "",
        flag: false,
      },
      balance: '0.00',
    });
  },


  /**
   * 本地持久化中获取用户信息
   */
  _getStorageUserInfo() {
    let uicon = wx.getStorageSync("uicon");
    let uid = wx.getStorageSync("uid");
    this.data.user_info.uicon = uicon;
    this.data.user_info.uid = uid;
    if (uicon) {
      this.data.user_info.flag = true;
      this.setData({
        user_info: this.data.user_info
      });
    } else {
      this.data.user_info.flag = false;
      this.setData({
        user_info: this.data.user_info
      });
    }
  },

  /**
   * API获取用户信息
   */
  _getUserInfo() {
    userInfoHelper.getUserInfo({
      success: res => {
        this.setData({
          user_info: {
            uicon: res.userInfo.avatarUrl,
            uid: res.userInfo.nickName,
            flag: true,
          }
        });
      },
      fail: error => {
        this.setData({
          user_info: {
            uicon: "",
            uid: "",
            flag: false,
          }
        });
      },
    })
  },
})