import axios from 'axios';

class LikeService {

    likePost(postId) {
        const API_URL = 'http://localhost:3000/api/';
        let user = JSON.parse(localStorage.getItem('user'));
        let token = user.token;
        console.log('token', token)
        console.log('postId', postId)

        return axios.post(`${API_URL}wall/post/${postId}/like`, 1,{ headers: { Authorization: `${token}`, } })
    }
}

export default new LikeService();