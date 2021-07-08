import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/api/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'wall/post');
  }

  getUserBoard() {
    let user = JSON.parse(localStorage.getItem('user'));
    return axios.get(API_URL + 'auth/profile/' + user.id, { headers: authHeader() });
  }

  updateUserProfile() {
    let user = JSON.parse(localStorage.getItem('user'));
    return axios.put(API_URL + 'auth/profile/' + user.id, { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();