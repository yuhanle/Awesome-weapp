var qwslib = require('../../vendor/qwslib')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    vertifycodeurl: {
      type: String,
      value: "/images/ic_loading.png"
    },
    picture_captcha: {
      type: Object,
      value: {}
    },
    inputvalue: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    vertifycodeurl: "/images/ic_loading.png",
    picture_captcha: {},
    inputvalue: "",
    // 弹窗显示控制
    isShow: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindinput(e) {
      var res = e.detail.value.trim()
      this.setData({ inputvalue: res })
      return res
    },
    refresh: function () {
      var that = this
      qwslib.smspic({
        data: { usage: 4 },
        success: function (res) {
          that.updateUI(res.data.data.picture_captcha)
        },
        fail: function () {
          
        }
      })
      this.triggerEvent('refreshAction', null)
    },
    cancleAction: function () {
      this.hideDialog()
      this.triggerEvent('cancelAction', null)
    },
    sureAction: function () {
      this.triggerEvent('sureAction', null)
    },

    //隐藏弹框
    hideDialog() {
      this.setData({
        isShow: false
      })
    },
    //展示弹框
    showDialog() {
      this.refresh()
      this.setData({
        inputvalue: "",
        isShow: true
      })
    },
    //更新验证码
    updateUI(data) {
      this.setData({
        picture_captcha: data,
        vertifycodeurl: data.url
      })
    }
  }
})
