export default class Comment {
    constructor(postId, username, comment, createdAt) {
      this.postId = postId;
      this.username = username;
      this.comment = comment;
      this.createdAt =createdAt
    }
  }