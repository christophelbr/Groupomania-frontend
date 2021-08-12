import axios from 'axios';

class CommentService {
  
  getComments(postId) {
    const API_URL = 'http://localhost:3000/api/';
let user = JSON.parse(localStorage.getItem('user'));
let token = user.token;
    return axios.get(`${API_URL}wall/post/${postId}`, {
      headers: {
        'Authorization': `${token}`
      }
    },
    );
  }
  postComment(postId) {
    const API_URL = 'http://localhost:3000/api/';
let user = JSON.parse(localStorage.getItem('user'));
let token = user.token;
    const comment = document.getElementById("comment").value;
    return axios.post(`${API_URL}wall/post/${postId}`,{ comment,}, { headers: { "Content-Type": "application/json", Authorization: `${token}`, },})

  } 
  deleteComment(id) {
    const API_URL = 'http://localhost:3000/api/';
    let user = JSON.parse(localStorage.getItem('user'));
    let token = user.token;
    return axios.delete(`${API_URL}wall/post/comment/${id}`, { headers: { 'Authorization': `${token}` } })
  }
}

export default new CommentService();