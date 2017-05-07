Page({
  data: {
  },
  /**
   * 分享
   */
  onShareAppMessage: function () {
    return {
      title: 'ISBN 扫码 - 黑客派',
      desc: '书单是黑客派社区的一个纸质书共享活动，所有书均来自捐赠。',
      path: '/pages/book/scan/scan'
    }
  },
  /**
   * 扫码
   */
  scan: function () {
    wx.scanCode({
      success: (res) => {
        if (res.errMsg !== 'scanCode:ok') {
          wx.showToast({
            title: res.errMsg,
            icon: 'loading',
            duration: 8000
          })
          return false;
        }

        if (res.scanType !== 'EAN_13') {
          wx.showToast({
            title: '我们需要的是 ISBN 编码',
            icon: 'loading',
            duration: 8000
          })
          return false;
        }

        wx.navigateTo({
          url: '../share/share?ISBN=' + res.result
        })
      }
    })
  }
})