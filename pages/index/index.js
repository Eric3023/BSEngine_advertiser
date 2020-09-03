const homeModel = require('../../models/home.js');
const locationModel = require('../../models/location.js');
const config = require('../../config/api.js');

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
    anchors: [
      {
        "img": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599129994271&di=845747b802070b7964ebfd205ae8d28b&imgtype=0&src=http%3A%2F%2Fpic2.zhimg.com%2F50%2Fv2-f853eca592d6c45a400bede2dda84583_hd.jpg",
        "width": 720,
        "height": 720,
      },
      {
        "img": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599130881493&di=653a7db098494c3ee187403c40497cea&imgtype=0&src=http%3A%2F%2Fimedl.sogoucdn.com%2Fcache%2Fskins%2FuploadImage%2F2019%2F01%2F24%2F15482965602427_former.png",
        "width": 500,
        "height": 350,
      },
      {
        "img": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4088367530,314026382&fm=26&gp=0.jpg",
        "width": 500,
        "height": 500,
      },
      {
        "img": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599130385518&di=571479aed19c423e3b46003ec33af582&imgtype=0&src=http%3A%2F%2Ftiebapic.baidu.com%2Fforum%2Fw%3D580%2Fsign%3D837c409fba6eddc426e7b4f309dab6a2%2F4cd11f950a7b0208f67c519b75d9f2d3562cc86e.jpg",
        "width": 900,
        "height": 900,
      },
      {
        "img": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1241198531,1374391408&fm=26&gp=0.jpg",
        "width": 378,
        "height": 497,
      },
      {
        "img": "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=740269948,992370364&fm=26&gp=0.jpg",
        "width": 500,
        "height": 500,
      },
      {
        "img": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1242086760,2772114585&fm=26&gp=0.jpg",
        "width": 680,
        "height": 1206,
      },
      {
        "img": "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2769814431,2294229273&fm=26&gp=0.jpg",
        "width": 337,
        "height": 600,
      },
    ],

    leftAnchors: [],
    rightAnchors: [],
    leftHeight: 0,
    rightHeight: 0,

    //周边用户数量
    user_num: 0,

    //是否显示霸屏
    bullying: false,
    bullyInfo: false,
  },

  /**
   * 加载页面
   */
  onLoad: function () {
    this._initData();
    this._getBanners();//请求轮播图
    this._getCouponing();//显示优惠券
  },

  /**
   * 分享页面
   */
  onShareAppMessage() {

  },

  /**
   * 导航进入其他页面
   */
  onNavigator(event) {
    const index = event.currentTarget.dataset.index;
    switch (index) {
      case 0:
        wx.navigateTo({
          url: '/pages/invitation/invitation',
        })
        break;
      case 1:
        wx.navigateTo({
          url: '/pages/guide/guide',
        })
        break;
      case 2:
        wx.navigateTo({
          url: '/pages/tasks/tasks',
        })
        break;
      case 3:
        wx.navigateTo({
          url: '/pages/profit/profit',
        })
        break;
    }
  },

  /**
   * 导航进入其他页面
   */
  onClick(event) {
    const index = event.currentTarget.dataset.index;
    switch (index) {
      case '猜你喜欢':
        wx.navigateTo({
          url: '/pages/collection/collection?title=猜你喜欢',
        })
        break;
      case '平台推荐':
        wx.navigateTo({
          url: '/pages/collection/collection?title=平台推荐',
        })
        break;
    }
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
    wx.navigateTo({
      url: '/pages/rob/rob',
    })
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

})
