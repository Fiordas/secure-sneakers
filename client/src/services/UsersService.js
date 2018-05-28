import Api from '@/services/Api'

export default {
  addUser (params) {
    return Api().post('users/signup', params)
  },
  authenticateUser (params) {
    return Api().post('users/signin', params)
  },
  fetchUser (params) {
    return Api().get('users/' + params.token)
  }
}
