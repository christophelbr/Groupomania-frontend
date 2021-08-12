import axios from 'axios';
import authHeader from './auth-header';

class UserService {
  getPublicContent() {
    const API_URL = 'http://localhost:3000/api';

    return axios.get(API_URL + 'wall/post');
  }

  getUserBoard() {
    const API_URL = 'http://localhost:3000/api';
    let user = JSON.parse(localStorage.getItem('user'));
    let token = user.token;
    let userId = user.user.id;
    return axios.get(`${API_URL}/auth/profile/${userId}`, { headers: { 'Authorization': `${token}` } });
  }

  updateUserPhoto(formData) {
    const API_URL = 'http://localhost:3000/api';
    let user = JSON.parse(localStorage.getItem('user'));
    let token = user.token;
    let userId = user.user.id;
    return axios.put(`${API_URL}/auth/profile/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': `${token}`
      }
    });
  }

  updateUserBio(formData) {
    const API_URL = 'http://localhost:3000/api';
    let user = JSON.parse(localStorage.getItem('user'));
    let token = user.token;
    let userId = user.user.id;
    return axios.put(`${API_URL}/auth/profile/${userId}`, formData, { 
      headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': `${token}`
      }
    });
  }

  deleteUserProfile() {
    const API_URL = 'http://localhost:3000/api';
    let user = JSON.parse(localStorage.getItem('user'));
    let token = user.token;
    let userId = user.user.id;
    console.log(userId)
    return axios.delete(`${API_URL}/auth/profile/${userId}`, { headers: { 'Authorization': `${token}` } });
  }

  getModeratorBoard() {
    const API_URL = 'http://localhost:3000/api';
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    const API_URL = 'http://localhost:3000/api';
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();