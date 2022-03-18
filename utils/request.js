// const url = 'http://localhost:8000/api/v1'
const url = 'https://teeth.manzhi.top/api/v1'

const showErrToast = (msg) => {
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: 2000,
  })
}

const showModal = (msg, yes, no) => {
  wx.showModal({
    title: '提示',
    content: msg,
    success: function (res) {
      if (res.confirm) {
        console.log('确定')
        yes()
      } else {
        console.log('取消')
        no()
      }
    }
  })
}

var register = function (code, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/register',
    header: {
      'Accept': 'application/json'
    },
    data: {
      'code': code
    },
    method: 'PUT',
    success: function (e) {
      if (e.data.code === 200) {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var test = function (token, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/test',
    method: 'GET',
    header: {
      'Authorization': 'Bearer ' + token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var getTeethData = function (app, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/teeth-data',
    method: 'GET',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var updateCleanTeethData = function (app, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/form-data',
    method: 'POST',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else {
        callback(e.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var getOneRecord = function (app, company_id, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/one-appoint/' + company_id,
    method: 'get',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var updateAppoint = function (app, company_id, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/update-appoint/' + company_id,
    method: 'get',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var getUserInfo = function (app, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/user-info',
    method: 'get',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var adArticle = function (app, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/ad-article',
    method: 'get',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var ad = function (app, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/ad',
    method: 'get',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var postDrawCard = function (app, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/draw-card',
    method: 'POST',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var cardInfo = function (app, company_id, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/card-info/' + company_id,
    method: 'get',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var indexData = function (app, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/index',
    method: 'GET',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else {
        callback(e.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var appointFilm = function (app, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/appoint-film',
    method: 'POST',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var getRecords = function (app, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/records',
    method: 'get',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var getCustomerRecord = function (app, company_id, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/customer-record/' + company_id,
    method: 'get',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var getCustomer = function (app, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/customer',
    method: 'get',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var search = function (app, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/search',
    method: 'get',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var getCompany = function (app, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/company',
    method: 'get',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var getActivity = function (app, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/activity',
    method: 'get',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var getOneActivity = function (app, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/one-activity',
    method: 'get',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var addSale = function (app, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/add-sale',
    method: 'get',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var getSale = function (app, company_id, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/get-sale/' + company_id,
    method: 'get',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var delSale = function (app, company_id, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/del-sale/' + company_id,
    method: 'get',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var inviteCode = function (app, company_id, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/invite-code/' + company_id,
    method: 'get',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var getPhone = function (app, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/phone',
    method: 'post',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var login = function (app, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/login',
    method: 'get',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var getOtherUserInfo = function (app, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/other-user-info',
    method: 'get',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var getQrCode = function (app, company_id, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/qr-code/' + company_id,
    method: 'get',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var getTeethDetail = function (app, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/teeth-detail',
    method: 'get',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var queryPrice = function (app, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/query-price',
    method: 'get',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var updateUserInfo = function (app, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/update-user-info',
    method: 'post',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var uploadImg = function (app, path, callback) {
  wx.uploadFile({
    url: url + '/upload-img', //仅为示例，非真实的接口地址
    header:{
      'Authorization': 'Bearer ' + app.globalData.userInfo.token,
      "Content-Type": "multipart/form-data"
    },
    filePath: path,
    name: 'img',
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var settleCompany = function (app, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/settle',
    method: 'post',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}


var ownCompanyQrCode = function (app, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/own-company-qr-code',
    method: 'get',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var settleCompany = function (app, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/settle',
    method: 'post',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var ownCompanyQrCode = function (app, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/own-company-qr-code',
    method: 'get',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var delImg = function (app, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/del-img',
    method: 'get',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var createAct = function (app, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/create-act',
    method: 'post',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var updateAct = function (app, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/update-act',
    method: 'post',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var getActivities = function (app, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/activities',
    method: 'get',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

var delAct = function (app, data, callback) {
  wx.showNavigationBarLoading()
  wx.request({
    url: url + '/del-act',
    method: 'get',
    header: {
      'Authorization': 'Bearer ' + app.globalData.userInfo.token
    },
    data: data,
    success: function (e) {
      console.log(e)
      if (e.data.code === 401) {
        console.log('权限不够')
      } else if (e.data.code === 201) {
        showErrToast(e.data.message)
      } else {
        callback(e.data.data)
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
    }
  })
}

module.exports = {
  delAct,
  updateAct,
  getActivities,
  createAct,
  delImg,
  getQrCode,
  register,
  login,
  getTeethData,
  updateCleanTeethData,
  getOneRecord,
  updateAppoint,
  getUserInfo,
  postDrawCard,
  indexData,
  showErrToast,
  appointFilm,
  getRecords,
  getCustomer,
  search,
  adArticle,
  ad,
  showModal,
  getCompany,
  addSale,
  getSale,
  delSale,
  inviteCode,
  getPhone,
  getOtherUserInfo,
  cardInfo,
  getCustomerRecord,
  getTeethDetail,
  queryPrice,
  updateUserInfo,
  uploadImg,
  settleCompany,
  ownCompanyQrCode,
  getActivity,
  getOneActivity,
  ownCompanyQrCode,
  settleCompany,
  test
}