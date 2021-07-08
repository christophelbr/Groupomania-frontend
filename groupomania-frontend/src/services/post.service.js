import axios from 'axios';
//import { post } from '../../../../backend/routes/user.route';
//import authHeader from './auth-header';


const API_URL = 'http://localhost:3000/api/';

class PostService {
  getPublicContent() {
    let user = JSON.parse(localStorage.getItem('user'));
    let token = user.token;

    return axios.get(API_URL + 'wall/post', {
      headers: {
        'Authorization': `${token}`
      }
    }
    );
  }
  getComments(postId) {
    let user = JSON.parse(localStorage.getItem('user'));
    let token = user.token;

    return axios.get(`${API_URL}wall/post/${postId}`, {
      headers: {
        'Authorization': `${token}`
      }
    }
    );

  }
 /*   postContent() {
    

    let user = JSON.parse(localStorage.getItem('user'));
    let token = user.token;
    return axios.post(`${API_URL}wall/post`,
      {
        title,
        content
      },
      {
        headers: {
          'Authorization': `${token}`
        }
      }
    );


  }  */

}

export default new PostService();