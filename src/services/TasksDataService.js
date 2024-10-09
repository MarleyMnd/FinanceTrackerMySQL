import http from '../http-common'
import axios from 'axios'

const API_URL = 'http://localhost:8080/api/Tasks'

class UsersDataService {
  getAll () {
    return http.get('/Tasks')
  }

  create (data) {
    return http.post('/Tasks', data)
  }

  get (id) {
    return http.get(`/Tasks/${id}`)
  }

  update (id, data) {
    return http.put(`/Tasks/${id}`, data)
  }

  delete (id) {
    return http.delete(`/Tasks/${id}`)
  }

  getAllUsers () {
    return axios.get(API_URL)
  }
}
export default new UsersDataService()
