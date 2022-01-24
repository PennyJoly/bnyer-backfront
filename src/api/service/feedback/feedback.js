import request from '@/utils/request'

// 查询问题反馈分页
export function listFeedback(query) {
  return request({
    url: '/service/feedback/list',
    method: 'post',
    params: query
  })
}

// 查询问题反馈详情
export function getFeedback(id) {
  return request({
    url: '/service/feedback/details/' + id,
    method: 'get'
  })
}

// 修改问题反馈
export function updateFeedback(data) {
  return request({
    url: '/service/feedback/update',
    method: 'post',
    data: data
  })
}

// 新增问题反馈
export function addFeedback(data) {
  return request({
    url: '/service/feedback/insert',
    method: 'post',
    data: data
  })
}

// 删除问题反馈
export function delFeedback(ids) {
  return request({
    url: '/service/feedback/delete/' + ids,
    method: 'delete'
  })
}

// 更改是否显示状态
export function updateIsShow(data) {
  return request({
    url: '/service/feedback/updateIsShow',
    method: 'post',
    data: data
  })
}