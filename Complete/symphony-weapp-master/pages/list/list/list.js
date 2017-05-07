var Util = require('../../util/util.js');
Page({
  data: {
    articles: [],
    currentPage: 0,
    isFinished: false
  },
  /**
   * 分享
   */
  onShareAppMessage: function () {
    return {
      title: '书单 - 黑客派',
      desc: '『书单』是 黑客派 社区的一个纸质书共享计划，所有书均来自捐赠，原则上当前的书籍持有者有义务将书寄送给需要的会员。',
      path: '/pages/list/list/list'
    }
  },
  /**
   * 跳转到详情页面
   */
  goDetail: function (event) {
    wx.navigateTo({
      url: '/pages/book/share/share?share=no&ISBN=' + event.currentTarget.dataset.isbn
    })
  },
  /**
   * 页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading();
    this._getList(1);
  },
  /**
   * 页面渲染完成，隐藏导航 loading 效果
   */
  onReady: function () {
    wx.hideNavigationBarLoading();
  },
  /**
   * 刷新
   */
  refresh: function (e) {
    this._getList(1);
  },
  /**
   * 加载下一页
   */
  loadMore: function (e) {
    if (this.data.isFinished) {
      wx.showToast({
        title: '已经到底了',
        icon: 'loading',
        duration: 2000,
        mask: true
      })
      return false;
    }
    this._getList(this.data.currentPage + 1);
  },
  /**
   * 获取列表数据
   */
  _getList: function (p) {
    Util.networkStatus()
    let that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000,
      mask: true
    })

    wx.request({
      url: 'https://hacpai.com/books',
      method: 'POST',
      data: {
        p: p
      },
      header: {
        'content-type': 'application/json',
        'Cookie': 'b3log-latke=' + wx.getStorageSync('cookie')
      },
      success: function (res) {
        if (res.errMsg !== 'request:ok') {
          wx.showToast({
            title: res.errMsg,
            icon: 'loading',
            duration: 8000
          })
          return false;
        }
        if (!res.data.sc) {
          wx.showToast({
            title: res.data.msg,
            icon: 'loading',
            duration: 8000
          })
          return false;
        }

        if (p === 1) {
          that.setData({
            articles: [],
            isFinished: false
          })
        }
        that.setData({
          articles: that.data.articles.concat(res.data.articles),
          currentPage: p
        })

        if (res.data.articles.length === 0) {
          that.setData({
            isFinished: true
          })
        }

        wx.hideToast();
      },
      fail: function (res) {
        wx.showToast({
          title: res.errMsg,
          icon: 'loading',
          duration: 8000
        })
      }
    })
  }
})