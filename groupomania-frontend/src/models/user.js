export default class User {
    constructor(bio, username, email, password, photo, isAdmin) {
      this.bio = bio;
      this.email = email;
      this.username = username;
      this.password = password;
      this.photo = photo;
      this.isAdmin = isAdmin;
    }
  }