import axios from 'axios';
//import { post } from '../../../../backend/routes/user.route';
//import authHeader from './auth-header';




class PostService {
  getContent() {
    const API_URL = 'http://localhost:3000/api/';
    let user = JSON.parse(localStorage.getItem('user'));
    let token = user.token;
    return axios.get(API_URL + 'wall/post', {
      headers: { 'Authorization': `${token}` }
    });
  }

  createPost(formData) {
    const API_URL = 'http://localhost:3000/api/';
    let user = JSON.parse(localStorage.getItem('user'));
    let token = user.token;
    return axios.post(API_URL + 'wall/post', formData, { headers: { 'Authorization': `${token}` } });
  }

  deletePost(id) {
    const API_URL = 'http://localhost:3000/api/';
    let user = JSON.parse(localStorage.getItem('user'));
    let token = user.token;
    return axios.delete(`${API_URL}wall/post/${id}`, { headers: { 'Authorization': `${token}` } })
  }
}

export default new PostService();