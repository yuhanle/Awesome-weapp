var calcMD5 = require('../../js/md5.js');
var Util = require('../util/util.js');
Page({
  data: {
    userName: 'book_share',
    password: 'book_share',
    needCaptcha: false,
    captchaURL: '',
    disabled: true
  },
  /**
   * 初始化加载
   * options url 参数
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'cookie',
      success: function (res) {
        if (!res.data) {
          return false;
        }
        wx.redirectTo({
          url: '../index/index'
        })
      }
    })

    Util.networkStatus()
    var that = this;
    wx.request({
      url: 'https://hacpai.com/login',
      data: {
        nameOrEmail: this.data.userName,
        userPassword: calcMD5(this.data.password),
        rememberLogin: true,
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.errMsg !== 'request:ok') {
          wx.showToast({
            title: res.errMsg,
            icon: 'loading',
            mask: true
          })
          return false;
        }

        if (!res.data.sc) {
          that.setData({
            userName: '',
            password: ''
          })
        }
      },
      complete: function () {
        that.setData({
          disabled: false
        })
      }
    });
  },
  /**
   * 跳转到注册页面
   */
  goRegister: function () {
    wx.redirectTo({
      url: '../register/register'
    })
  },
  /**
   * 刷新验证码 
   */
  refreshCaptcha: function () {
    this.setData({
      captchaURL: 'https://hacpai.com/captcha/login?needCaptcha=' + this.data.needCaptcha + '&t=' + (new Date()).getTime()
    });
  },
  /**
   * 登录
   */
  login: function (e) {
    Util.networkStatus()
    var that = this;
    wx.request({
      url: 'https://hacpai.com/login',
      data: {
        nameOrEmail: e.detail.value.userName,
        userPassword: calcMD5(e.detail.value.password),
        rememberLogin: true,
        captcha: e.detail.value.captcha
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.errMsg !== 'request:ok') {
          wx.showToast({
            title: res.errMsg,
            icon: 'loading',
            mask: true
          })
          return false;
        }
        if (!res.data.sc) {
          if (res.data.needCaptcha) {
            that.setData({
              needCaptcha: res.data.needCaptcha,
              captchaURL: 'https://hacpai.com/captcha/login?needCaptcha=' + res.data.needCaptcha + '&t=0.6956869461435669'
            });
          }
          wx.showToast({
            title: res.data.msg,
            icon: 'loading',
            mask: true
          })
          return false;
        }

        wx.setStorage({
          key: "cookie",
          data: res.data.token
        })

        if (e.detail.value.userName === 'book_share') {
          wx.showModal({
            title: '提示',
            content: '⚠️ 请使用黑客派个人账号进行登录，否则分享数据将被清空',
            showCancel: false,
            success: function () {
              wx.redirectTo({
                url: '../index/index'
              })
            }
          })
          return false;
        }
        wx.redirectTo({
          url: '../index/index'
        })
      },
      fail: function (res) {
        wx.showToast({
          title: res.errMsg,
          icon: 'loading',
          mask: true
        })
      }
    })
  }
})
