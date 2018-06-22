/**
 * 图片预加载组件
 *
 * @author yuhanle
 */
var Singleton = require('../../vendor/qwslib').Singleton

Component({
  // 组件的属性列表
  properties: {
    src: {
      type: String,
      value: "",
      observer: function (newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
        this._downloadRemoteImage(newVal)
      }
    },
    style: {
      type: String,
      value: ""
    },
    bindload: {
      type: Function,
      value: function () { }
    },
    binderror: {
      type: Function,
      value: function () { }
    }
  },

  // 组件的初始数据
  data: {
    src: "",
    style: "",
    bindload: function () { },
    binderror: function () { },
    filepath: "",
    downloadTasks: []
  },

  // 组件的方法列表
  methods: {
    _imgOnLoad(ev) {
      this.bindload && this.bindload(ev)
    },

    _imgOnLoadError(ev) {
      this.binderror && this.binderror(ev)
    },

    // 下载图片
    _downloadRemoteImage(src) {
      var fdStart = src.indexOf('http')
      // 判断src 是否是 http 开头
      if (fdStart == 0) {
        var that = this
        var slton = new Singleton()
        var task = wx.downloadFile({
          url: src,
          header: { 'Cookie': slton.cookie },
          success: function (res) {
            that.setData({
              filepath: res.tempFilePath
            })
          }
        })
      } else {
        this.setData({
          filepath: src
        })
      }
    }
  }
})
