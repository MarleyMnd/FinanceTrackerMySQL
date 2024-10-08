import http from '../http-common'
import axios from 'axios'

const API_URL = 'http://localhost:8080/api/Users'

class UsersDataService {
  getAll () {
    return http.get('/Users')
  }

  create (data) {
    return http.post('/Users', data)
  }

  get (id) {
    return http.get(`/Users/${id}`)
  }

  update (id, data) {
    return http.put(`/Users/${id}`, data)
  }

  delete (id) {
    return http.delete(`/Users/${id}`)
  }

  getAllUsers () {
    return axios.get(API_URL)
  }
}
export default new UsersDataService()
