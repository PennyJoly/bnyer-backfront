import request from '@/utils/request'

// 查询拼团类型分页
export function listGroupType(query) {
  return request({
    url: '/service/groupType/list',
    method: 'post',
    params: query
  })
}

// 查询拼团类型详情
export function getGroupType(id) {
  return request({
    url: '/service/groupType/details/' + id,
    method: 'get'
  })
}

// 检查拼团类型是否重复
export function checkGroupType(typeName) {
  return request({
    url: '/service/groupType/checkGroupType',
    method: 'post',
    params: typeName
  })
}

// 修改拼团类型
export function updateGroupType(data) {
  return request({
    url: '/service/groupType/update',
    method: 'post',
    data: data
  })
}

// 删除拼团类型
export function delGroupType(ids) {
  return request({
    url: '/service/groupType/delete/' + ids,
    method: 'delete'
  })
}

// 更改是否显示状态
export function updateIsShow(data) {
  return request({
    url: '/service/groupType/updateIsShow',
    method: 'post',
    data: data
  })
}

// 更改是否仅玩家可发起状态
export function updateIsPlayerUse(data) {
  return request({
    url: '/service/groupType/updateIsPlayerUse',
    method: 'post',
    data: data
  })
}

// 新增拼团类型
export function insertGroupType(data) {
  return request({
    url: '/service/groupType/insert',
    method: 'post',
    data: data
  })
}