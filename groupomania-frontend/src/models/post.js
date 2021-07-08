export default class Post {
    constructor(username, photo, title, content, attachement, likes, createdAt) {
      this.username = username;
      this.photo = photo;
      this.title = title;
      this.content = content;
      this.attachment = attachement;
      this.likes = likes;
      this.createdAt =createdAt
    }
  }