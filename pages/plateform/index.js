Page({

  /**
   * 页面的初始数据
   */
  data: {
    plateforms: [
      {
        id: 10001,
        icon: "/img/plateform/sina.png",
        name: '新浪微博',
      },
      {
        id: 10002,
        icon: "/img/plateform/wechat.png",
        name: '微信公众号',
      },
      {
        id: 10003,
        icon: "/img/plateform/douyin.png",
        name: '抖音',
      },

      {
        id: 10004,
        icon: "/img/plateform/hongshu.png",
        name: '小红书',
      },
      {
        id: 10005,
        icon: "/img/plateform/kuai.png",
        name: '快手',
      },
      {
        id: 10006,
        icon: "/img/plateform/bilibili.png",
        name: '哔哩哔哩动画',
      },

      {
        id: 10007,
        icon: "/img/plateform/meipai.png",
        name: '美拍',
      },
      {
        id: 10008,
        icon: "/img/plateform/miaopai.png",
        name: '秒拍',
      },
      {
        id: 10009,
        icon: "/img/plateform/weishi.png",
        name: '微视',
      },

      {
        id: 10010,
        icon: "/img/plateform/toutiao.png",
        name: '今日头条',
      },
      {
        id: 10011,
        icon: "/img/plateform/yingke.png",
        name: '映客',
      },
      {
        id: 10012,
        icon: "/img/plateform/huajiao.png",
        name: '花椒',
      },

      {
        id: 10013,
        icon: "/img/plateform/yizhibo.png",
        name: '一直播',
      },
      {
        id: 10014,
        icon: "/img/plateform/douyu.png",
        name: '斗鱼',
      },
      {
        id: 10015,
        icon: "/img/plateform/YY.png",
        name: 'YY',
      },

      {
        id: 10016,
        icon: "/img/plateform/xiaoka.png",
        name: '小咖秀',
      },
      {
        id: 10017,
        icon: "/img/plateform/youku.png",
        name: '优酷',
      },
      {
        id: 10018,
        icon: "/img/plateform/tudou.png",
        name: '土豆视频',
      },

      {
        id: 10019,
        icon: "/img/plateform/iqiyi.png",
        name: '爱奇艺',
      },
      {
        id: 10020,
        icon: "/img/plateform/souhu.png",
        name: '搜狐视频',
      },
      {
        id: 10021,
        icon: "/img/plateform/tencent.png",
        name: '腾讯视频',
      },

      {
        id: 10022,
        icon: "/img/plateform/acfun.png",
        name: 'AcFun',
      },
      {
        id: 10023,
        icon: "/img/plateform/zhanqi.png",
        name: '战旗直播',
      },
      {
        id: 10024,
        icon: "/img/plateform/huya.png",
        name: '虎牙直播',
      },

      {
        id: 10025,
        icon: "/img/plateform/huoshan.png",
        name: '火山小视频',
      },
      {
        id: 10026,
        icon: "/img/plateform/xigua.png",
        name: '西瓜视频',
      },
      {
        id: 10027,
        icon: "/img/plateform/taobao.png",
        name: '淘宝达人',
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * Item点击监听
   */
  onClickItem: function (event) {
    let id = event.currentTarget.dataset.id
    wx.showToast({
      title: `id:${id}`,
      icon: 'none'
    })
  }
})