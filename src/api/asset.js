import request from '@/utils/request'

const assetApi = {
  getWardAndDistrict: '/get_ward',
  getListProvince: '/get_list_province'
}

export function getWardAndDistrict (data) {
  return request({
    url: assetApi.getWardAndDistrict,
    method: 'post',
    data: data
  })
}
export function getListProvince () {
  return request({
    url: assetApi.getListProvince,
    method: 'get'
  })
}
