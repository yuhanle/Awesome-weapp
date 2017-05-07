Page({
    data: {
        title: '',
        playlist: [],
        items: []
    },
    //事件处理函数
    onLoad: function (options) {
        var that = this

        //playingList
        wx.request({
            url: 'http://json.bmbstack.com/cinemaList',
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                console.log(res.data)
                that.setData({
                    items: res.data
                })
            }
        })
    },
    onReady: function () {
        wx.setNavigationBarTitle({
            title: '电影院'
        })
    },
    onPullDownRefresh: function(){
        var that = this

        //playingList
        wx.request({
            url: 'http://json.bmbstack.com/cinemaList',
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                console.log(res.data)
                that.setData({
                    items: res.data
                })
            }
        })
    },
    onReachBottom: function() {
        var that = this
        
        //playingList
        wx.request({
            url: 'http://json.bmbstack.com/cinemaList',
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                wx.stopPullDownRefresh()
                console.log(res.data)
                that.data.playlist = that.data.playlist.concat(res.data)
                that.setData({
                    items: that.data.playlist
                })
            },
            fail: function(res) {
                wx.stopPullDownRefresh()
                console.log(res.data)
            }
        })
    }
})
