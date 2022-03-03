const request = require("../../utils/request.js")
const app = getApp()

Page({
  data: {
    article_url:''
  },
  onLoad(e){
    console.log(e.id)
    var that = this
    request.adArticle(app,{'id':e.id},(res)=>{
      console.log(res)
      that.setData({
        article_url:res.article_url
      })
    })
  }
})