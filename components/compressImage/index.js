// components/compressImage/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    path: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    cWidth: 0,
    cHeight: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
      * 压缩图片
      */
    _compressImage(path) {
      return new Promise((resolve, reject) => {
        //获取图片体积 
        this._getFileInfo(path)
          .then(res => {
            let size = res.size;
            if (size <= 1.6 * 1024 * 1024) {
              resolve(path);
            } else {
              //获取图片尺寸
              this._getImageInfo(path)
                .then(res => {
                  return this._compressImageByCanvas(res);
                })
                .then(res => {
                  return this._compressImage(res);
                })
                .then(res => {
                  resolve(res);
                })
                .catch(e => {
                  reject(e);
                });
            }
          })
          .catch(e => {
            reject(e);
          });
      });
    },

    /**
     * 获取文件信息（图片体积大小）
     */
    _getFileInfo(path) {
      return new Promise((resolve, reject) => {
        wx.getFileInfo({
          filePath: path,
          success: res => {
            resolve(res);
          },
          fail: e => {
            reject(e);
          }
        });
      })
    },

    /**
     * 获取图片信息（图片尺寸大小）
     */
    _getImageInfo(path) {
      return new Promise((resolve, reject) => {
        wx.getImageInfo({
          src: path,
          success: res => {
            resolve(res);
          },
          fail: e => {
            reject(e);
          }
        })
      });
    },

    /**
     * 使用Canvas压缩图片
     */
    _compressImageByCanvas(res) {
      //---------利用canvas压缩图片--------------
      var ratio = 0.5;
      var canvasWidth = res.width;//图片原始长宽
      var canvasHeight = res.height;
      canvasWidth = Math.trunc(res.width * ratio)
      canvasHeight = Math.trunc(res.height * ratio)
      this.setData({
        cWidth: canvasWidth,
        cHeight: canvasHeight
      })

      //----------绘制图形并取出图片路径--------------
      var ctx = wx.createCanvasContext('canvas')
      ctx.drawImage(res.path, 0, 0, canvasWidth, canvasHeight)
      return new Promise((resolve, reject) => {
        ctx.draw(false, setTimeout(() => {
          wx.canvasToTempFilePath({
            canvasId: 'canvas',
            fileType: 'jpg',
            destWidth: canvasWidth,
            destHeight: canvasHeight,
            success: res => {
              resolve(res.tempFilePath);
            },
            fail: e => {
              console.log(e.errMsg)
              reject(e);
            }
          })
        }, 3000));
      });
    },
  }
})
