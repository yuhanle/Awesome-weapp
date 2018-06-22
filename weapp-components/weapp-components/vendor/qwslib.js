var baseUrl = 'https://apiv2.360qws.cn';
var md5 = require('../utils/md5').md5;

var noop = function noop() { };
var defaultOptions = {
  url: null,
  method: 'POST',
  success: noop,
  fail: noop,
  complete: noop
};

// 单例构造函数
function CreateSingleton(cookie) {
  this.cookie = cookie;
};

// 获取实例的名字
CreateSingleton.prototype.getCookie = function () {
  console.log(this.cookie)
};

// 单例对象
var Singleton = (function () {
  var instance;
  return function (cookie) {
    if (!instance) {
      instance = new CreateSingleton(cookie);
    }
    return instance;
  }
})();

/**
 * smspic
 * 
 * phone_num  手机号
 * usage      默认  0
 */
var smspic = function (option) {
  var requestutc = Date.now()
  var token = '360QWS' + requestutc.toString() + 'PICVC'
  var data = option.data || {}
  data.token = md5(token)
  data.ts = requestutc
  option.data = data
  request(extend({ url: baseUrl + '/user/requestpicvc' }, option))
}

/**
 * request
 */
var request = function (data) {
  let success = data.success || null
  let fail = data.fail || null
  let complete = data.complete || null
  
  data.success = function (res) {
    console.log(res)

    // 存储cookie
    if (res.header["Set-Cookie"]) {
      var ccCookie = new Singleton()
      ccCookie.cookie = res.header["Set-Cookie"]
    }

    success ? success(res) : noop
  }
  data.fail = function (err) {
    console.log(err)
    fail ? fail(res) : noop
  }
  data.complete = function (res) {
    complete ? complete(res) : noop
  }

  var cookie = (new Singleton()).cookie
  if (cookie && cookie.length) {
    var header = data.header || {}
    header.Cookie = cookie
    data.header = header
  }

  console.log(data)
  wx.request(extend(defaultOptions, data))
}

/**
 * extend
 */
var extend = function extend(target) {
  var sources = Array.prototype.slice.call(arguments, 1)

  for (var i = 0; i < sources.length; i += 1) {
    var source = sources[i]
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        target[key] = source[key]
      }
    }
  }

  return target
}

module.exports = {
  smspic: smspic,
  Singleton: Singleton,
}