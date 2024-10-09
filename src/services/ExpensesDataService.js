import http from '../http-common'
import axios from 'axios'

const API_URL = 'http://localhost:8080/api/expenses'

class UsersDataService {
  getAll () {
    return http.get('/expenses')
  }

  create (data) {
    return http.post('/expenses', data)
  }

  get (id) {
    return http.get(`/expenses/${id}`)
  }

  update (id, data) {
    return http.put(`/expenses/${id}`, data)
  }

  delete (id) {
    return http.delete(`/expenses/${id}`)
  }

  getAllUsers () {
    return axios.get(API_URL)
  }
}
export default new UsersDataService()
