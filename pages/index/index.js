const homeModel = require('../../models/home.js');
const mediaModel = require('../../models/media.js')

//获取应用实例
const app = getApp()

Page({
  data: {
    // Banner默认轮播图(防止网络数据获取失败，显示空白)
    banners: [
      { imageUrl: '/img/banner/banner1.jpg' },
    ],
    defaultBanner: '/img/banner/banner1.jpg',

    //推荐主播
    list: [],

    leftAnchors: [],
    rightAnchors: [],
    leftHeight: 0,
    rightHeight: 0,

    //是否显示霸屏
    bullying: false,
    bullyInfo: false,
  },

  /**
   * 加载页面
   */
  onLoad: function () {
    this._getBanners();//请求轮播图
    this._getCouponing();//显示优惠券
    this._getMedias()
  },

  /**
   * 分享页面
   */
  onShareAppMessage() {

  },

  /**
   * Banner图片加载失败(显示默认图片)
   */
  onBannerError(event) {
    const index = event.currentTarget.dataset.index;
    this.data.banners[index].imageUrl = this.data.defaultBanner;
    this.setData({
      banners: this.data.banners,
    });
  },

  /**
   * 点击了活动Item
   */
  onClickItem: function (event) {

  },

  /**
   * 点击顶部搜索按钮
   */
  onSearch(event) {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  /**
   * 点击顶部分类按钮
   */
  onMenu(event) {
    wx.navigateTo({
      url: '/pages/categoryRank/index',
    })
  },

  /**
   * 关闭优惠霸屏
   */
  onCloseCoupon() {
    app.globalData.couponing = false;
    this.setData({
      bullying: false,
      bullyInfo: false,
    });
  },

  /**
   * 领取优惠券
   */
  onConfirCoupon() {
    app.globalData.couponing = false;
    this.setData({
      bullying: false,
      bullyInfo: true,
    });
    setTimeout(res => {
      console.log('已领取优惠券');
      this.onCloseCoupon();
    }, 3000)
  },

  /**
   * 查看主播主页
   */
  onClickItem: function(event){
    let item = event.currentTarget.dataset.item
    let url = item.indexUrl
    wx.navigateTo({
      url: `/pages/webview/webview?url=${url}`,
    })
  },

  /**
   * 数据分列
   */
  _initData: function () {
    for (var i = 0; i < this.data.anchors.length; i++) {
      var item = this.data.anchors[i]
      //放在右侧
      if (this.data.leftHeight > this.data.rightHeight) {
        this.data.rightAnchors.push(item)
        this.data.rightHeight += item.height / item.width
      }
      //放在左侧
      else {
        this.data.leftAnchors.push(item)
        this.data.leftHeight += item.height / item.width
      }
    }

    this.setData({
      leftAnchors: this.data.leftAnchors,
      rightAnchors: this.data.rightAnchors,
    })

  },

  /**
   * 获取轮播图
   */
  _getBanners() {
    homeModel.getBanners().then(
      res => {
        let banners = res.data;
        if (banners) {
          this.setData({
            banners: banners
          });
        }
      },
      error => {

      }
    );
  },

  /**
   * 是否需要显示霸屏
   */
  _getCouponing() {
    this.setData({
      bullying: app.globalData.couponing,
    });
  },

  /**
   * 获取首页推荐账号
   */
  _getMedias() {
    let param = {
      page: 1,
      size: 10,
    }

    mediaModel.getMediaAccounts(param).then(
      res => {
        this.data.list = this.data.list.concat(res.data.list);
        this.setData({
          list: this.data.list,
        });
        wx.hideLoading();
      }, error => {
        wx.hideLoading();
      }
    );
  }

})
