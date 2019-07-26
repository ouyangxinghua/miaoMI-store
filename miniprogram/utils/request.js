import * as API from "./api.js"
const request = (url, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data,
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      }
    })
  });
}

const showLoading = () => {
  wx.showLoading({
    title: '正在加载中',
    mask: true,
  });
}

module.exports = {
  getGoodList: () => {
    return request(API.goodList, false)
  },
  getCategroy: () => {
    return request(API.category, false)
  },
  getGoodDetail: () => {
    return request(API.goodDetail, false)
  },
  showLoading
}