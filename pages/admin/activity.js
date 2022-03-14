const request = require('../../utils/request.js')

const app = getApp()
Page({

    data: {
        activity: [],
        page: 1,
    },
    onLoad: function (options) {

    },
    onShow() {
        this.getActivity()
    },
    onReachBottom() {
        this.getActivity()
    },
    getActivity() {
        var that = this
        var data = {
            page: this.data.page,
            company_id: wx.getStorageSync('company_id')
        }
        request.getActivities(app, data, (res) => {
            console.log('getActivity', res)
            if (res.length > 0) {
                console.log(res)
                that.setData({
                    activity: that.data.activity.concat(res),
                    page: that.data.page + 1
                })
            }
        })
    },
    edit(e) {
        console.log(e)
        var type = e.currentTarget.dataset.type,
            id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '/pages/admin/createAct?type=' + type + '&id=' + id,
        })
    },
    delete(e) {
        var index = e.currentTarget.dataset.index,
            activity = this.data.activity,
            id = activity[index].id
        var that = this
        request.showModal('是否删除？', () => {
            request.delAct(app, {
                activity_id: id,
                company_id: wx.getStorageSync('company_id')
            }, () => {
                request.showErrToast('删除成功')
                activity.splice(index, 1)
                that.setData({
                    activity: activity
                })
            })
        }, () => {})
    }
})