import request from '@/utils/request'

// 查询问题反馈类型分页
export function listFeedbackType(query) {
  return request({
    url: '/service/feedbackType/list',
    method: 'post',
    params: query
  })
}

// 更改是否显示状态
export function updateIsShow(data) {
  return request({
    url: '/service/feedbackType/updateIsShow',
    method: 'post',
    data: data
  })
}

// 新增问题反馈类型
export function addFeedbackType(data) {
  return request({
    url: '/service/feedbackType/insert',
    method: 'post',
    data: data
  })
}

// 修改问题反馈类型
export function updateFeedbackType(data) {
  return request({
    url: '/service/feedbackType/update',
    method: 'post',
    data: data
  })
}

// 删除问题反馈类型
export function delFeedbackType(ids) {
  return request({
    url: '/service/feedbackType/delete/' + ids,
    method: 'delete'
  })
}

// 查询问题反馈类型详情
export function getDetails(id) {
  return request({
    url: '/service/feedbackType/details/' + id,
    method: 'get'
  })
}