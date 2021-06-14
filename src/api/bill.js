import request from '@/utils/request'

const assetApi = {
  create_bill_normal: '/create_bill_normal'
}

export function createBillNormal (data) {
  return request({
    url: assetApi.create_bill_normal,
    method: 'post',
    data: data
  })
}
