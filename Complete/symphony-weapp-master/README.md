# symphony-weapp


Symphony 社区平台的微信小程序，提供一些实用工具服务，比如[『书单』](https://hacpai.com/tag/book_share)。小程序暂不支持注册，体验需前往[注册](https://hacpai.com/register?r=Vanessa)

![hacpai 小程序](http://git.oschina.net/uploads/images/2017/0109/095544_a27820f2_301269.png "在这里输入图片标题")


## 登录

![login](http://git.oschina.net/uploads/images/2017/0108/131646_c5875567_301269.png)

* 对 md5.js 进行封装，使其可以在小程序中进行使用
* 微信提交登录请求
* 使用微信数据缓存存储用户标识以实现类似 Cookie 的作用

## 书单

![isbn](http://git.oschina.net/uploads/images/2017/0108/131547_5e303f25_301269.png)

* 调用微信扫码接口读取书籍 ISBN
* 微信提交书籍信息查询

## 共享

![share](http://git.oschina.net/uploads/images/2017/0108/131718_798256e5_301269.png)

* 微信提交书籍共享请求

## 其他微信 API

* 设置导航条
* 导航
* 交互反馈
* 网络状态

## 服务端

服务端接口请参考 Symphony 项目 :)
