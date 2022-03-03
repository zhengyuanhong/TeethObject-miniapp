const request = require('../../utils/request.js')
const app = getApp()
Page({
  data: {
    page: 1,
    customers: [],
    keyWrold:''
  },
  getCustomer() {
    var that = this
    var data = {
      page: this.data.page,
      company_id: wx.getStorageSync('company_id')
    }
    request.getCustomer(app, data, (res) => {
      console.log('getCustomer', res)
      if (res.length > 0) {
        that.setData({
          customers: that.data.customers.concat(res),
          page: that.data.page + 1
        })
      } else {
        if(that.data.customers.length != 0 && res.length == 0){
          request.showErrToast('已经到底了')   
        }
      }
    })
  },
  onLoad() {
    this.getCustomer()
  },
  onReachBottom() {
    this.getCustomer()
  },
  copyPhone(index){
  var that = this

  wx.setClipboardData({
    data: that.data.customers[index].phone,
    success:function(){
      console.log('已复制')
    }
  })
  },
  search(e) {
    console.log(e)
    var that = this
    request.search(app,{'key_world':that.data.keyWrold},(res)=>{
      console.log('search',res)
      that.setData({
        customers:res
      })
    })
  },
  inputSearch(e) {
    console.log(e.detail.value)
    this.setData({
      keyWrold: e.detail.value
    })
  },
  callOrCp(e){
    var index = e.currentTarget.dataset.index
    var that = this
    console.log(index)
    wx.showActionSheet({
      itemList: ['复制电话','拨打电话'],
      success(res) {
        console.log(res.tapIndex)
        if(res.tapIndex === 0){
          that.copyPhone(index)
        }
        if(res.tapIndex === 1){
          that.callPhone(index)
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  callPhone(index){
    var that = this
    wx.makePhoneCall({
      phoneNumber: that.data.customers[index].phone
    })
  }
})