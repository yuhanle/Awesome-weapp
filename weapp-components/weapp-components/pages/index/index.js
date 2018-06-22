Page({
  onLoad: function() {
    
  },

  onReady: function () {
    //获得dialog组件
    this.dialog = this.selectComponent("#smsbox")
  },

  showMa: function () {
    this.dialog.showDialog()
  },

  sureAction: function () {
    if (this.dialog.data.inputvalue.length <= 0) {
      console.log("验证码不能为空")
      return
    }

    this.dialog.hideDialog()
  }
})