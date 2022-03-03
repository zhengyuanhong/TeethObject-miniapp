const request = require('../../utils/request.js')
const app = getApp()
Page({
  data: {
    page: 1,
    records: [],
    is_admin: false,
    is_salesman: false,
    status: {
      await: {
        text: '审核中',
        color: 'yellow'
      },
      success: {
        text: '预约成功',
        color: 'green'
      },
      failed: {
        text: '预约失败',
        color: 'red'
      },
      arrived: {
        text: '已完成',
        color: 'green'
      },
      cancel: {
        text: '已取消',
        color: 'red'
      }
    },
    statusMenu: [
      ['arrived', 'success'],
      ['已到院', '预约成功']
    ]
  },
  getRecords() {
    var that = this
    var data = {
      page: this.data.page
    }
    request.getCustomerRecord(app, wx.getStorageSync('company_id'), data, (res) => {
      console.log('getRecores', res)
      if (res.length > 0) {
        that.setData({
          records: that.data.records.concat(res),
          page: that.data.page + 1
        })
      } else {
        if (that.data.records.length != 0 && res.length == 0) {
          request.showErrToast('已经到底了')
        }
      }
    })
  },
  onLoad() {
    this.getRecords()
    this.setData(wx.getStorageSync('role'))
  },
  onReachBottom() {
    this.getRecords()
  },
  cancelAppoint(e) {
    var that = this,
      index = e.currentTarget.dataset.index,
      data = {
        record_id: that.data.records[index].id,
        type: 'cancel'
      }

    request.showModal('是否取消预约？', () => {
      // request.updateAppoint(app, wx.getStorageSync('company_id'), data, (res) => {
      //   request.showErrToast('取消成功')
      //   var newData = that.data.records
      //   newData[index].is_cancel = 1
      //   that.setData({
      //     records: newData
      //   })
      // })
      that.update(data, index)
    }, () => {})
  },
  update(data, index) {
    var that = this
    return new Promise((resolve) => {
      request.updateAppoint(app, wx.getStorageSync('company_id'), data, (res) => {
        request.showErrToast('操作成功')
        var newRecords = that.data.records
        newRecords[index].appoint_status = data.type
        that.setData({
          records: newRecords
        })
        console.log('update promise', res)
        resolve(res)
      })
    })
  },
  changeStatus(e) {
    var that = this,
      index = e.currentTarget.dataset.index

    wx.showActionSheet({
      itemList: that.data.statusMenu[1],
      success(res) {
        console.log(res.tapIndex)
        var data = {
          record_id: that.data.records[index].id,
          type: that.data.statusMenu[0][res.tapIndex]
        }
        that.update(data, index)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  }
})