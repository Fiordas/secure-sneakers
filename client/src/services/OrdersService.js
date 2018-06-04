import Api from '@/services/Api'

export default {
  addOrder (params) {
    return Api().post('orders', params)
  },
  updateOrder (params) {
    return Api().put('orders/' + params.id, params)
  },
  getOrder (params) {
    return Api().get('orders/' + params.userId)
  }
}
