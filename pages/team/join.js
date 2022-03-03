const request = require('../../utils/request.js')
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        load_success: false,
        invite_code: '',
        admin_user_id: 0,
        adminUserInfo: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (e) {
        console.log(e)
        var that = this,
            num = 1

        that.setData({
            invite_code: e.invite_code,
            admin_user_id: e.admin_user_id
        })
        app.userLogin().then(() => {
            that.setData({
                load_success: true
            })
            that.getOtherUserInfo()
        })
    },
    getOtherUserInfo() {
        var that = this
        request.getOtherUserInfo(app, {
            user_id: this.data.admin_user_id
        }, (res) => {
            console.log(res)
            that.setData({
                adminUserInfo: res
            })
        })
    },
    joinTeam(e) {
        var that = this
        var data = {}
        wx.getUserProfile({
            desc: '用于完善会员资料',
            success: (res) => {
                console.log(res)
                that.setData({
                    userInfo: res.userInfo,
                    avatarUrl: res.userInfo.avatarUrl
                })
                data.avatar = res.userInfo.avatarUrl
                data.gender = res.userInfo.gender
                data.name = res.userInfo.name
                data.invite_code = that.data.invite_code

                request.addSale(app, data, (res1) => {
                    request.showErrToast('加入成功')
                    setTimeout(() => {
                        wx.reLaunch({
                            url: '/pages/company/company?scene=' + encodeURIComponent('company_id=' + that.data.adminUserInfo.company_id)
                        })
                    }, 2000)
                })
            },
            fail: () => {
                wx.showToast({
                    title: '加入失败，请重新加入',
                    icon: 'none'
                })
            }
        })
    }
})