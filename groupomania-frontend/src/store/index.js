import { createStore } from 'vuex'
import { auth } from './auth.module';
import postService from "../services/post.service"
import commentService from "../services/comment.service"
import userService from "../services/user.service"
import likeService from "../services/like.service";
import router from "../router/index"

export default createStore({
  strict: true,
  state: {
    // Posts
    content: [],
    post: {},

    // Commentaires
    comments: [],
    comment: {},

    // Users
    users: [],
    user: {},

  },


  getters: {
    // Posts
    content(state) {
      return state.content;
    },
    post(state) {
      return state.post;
    },

    // Commentaires
    comments(state) {
      return state.comments;
    },
    comment(state) {
      return state.comment;
    },
    // User
    users(state) {
      return state.users;
    },
    user(state) {
      return state.auth.user;
    },

  },

  mutations: {
    // Posts
    
    GET_CONTENT(state, content) {
      state.content = content
    },

    // Commentaires
    ADD_COMMENT(state, comments) {
      state.comments = [comments, ...state.comments];
    },
    GET_COMMENT(state, comments) {
      state.comments = comments;
    },
    
    // Users
    GET_PROFILE(state, user) {
      state.auth.user = user
    },
    UPDATE_PROFILE(state, id, user) {
      Object.assign(
        state.users.find((element) => element.id === id),
        user
      );
    },
    DELETE_PROFILE(state, id) {
      state.users = [...state.users.filter((element) => element.id !== id)];
      state.message = "compte supprimé";
    },


  },

  actions: {
    // Posts
    // Récupération des Posts
    getContent({ commit }) {
      postService.getContent().then((response) => {
        const content = response.data;
        for (let [index, post] of content.entries()) {
          commentService.getComments(post.id).then((response) => {
            content[index].Comments = response.data ? response.data : 0;
            commit("GET_COMMENT", content[index].Comments);
          });
        }
        commit("GET_CONTENT", content);
      });
    },

    // Création d'un Post
    createPost({ commit }, post) {
      postService.createPost(post)
        .then(() => {
          postService.getContent().then((response) => {
            const content = response.data;
            for (let [index, post] of content.entries()) {
              commentService.getComments(post.id).then((response) => {
                content[index].Comments = response.data ? response.data : 0;
                commit("GET_COMMENT", content[index].Comments);
              });
            }
            commit("GET_CONTENT", content);
          });
        });
    },

    // Suppression d'un post
    deletePost({ commit }, post) {
      postService.deletePost(post)
        .then(console.log('post supprimé'))
        .then(() => {
          postService.getContent().then((response) => {
            const content = response.data;
            for (let [index, post] of content.entries()) {
              commentService.getComments(post.id).then((response) => {
                content[index].Comments = response.data ? response.data : 0;
                commit("GET_COMMENT", content[index].Comments);
              });
            }
            commit("GET_CONTENT", content);
          });
        });
    },


    // Commentaires
    // Récupération des commentaires
    getComments({ commit }) {
      postService.getContent().then((response) => {
        const content = response.data;
        for (let [index, post] of content.entries()) {
          commentService.getComments(post.id).then((response) => {
            content[index].Comments = response.data ? response.data : 0;
            commit("GET_COMMENT", content[index].Comments);
          });
        }
      });
    },


    // Publication d'un commentaire
    postComment({ commit }, comment) {
      commentService.postComment(comment)
        .then((response) => {
          const comment = response.data;
          commit("ADD_COMMENT", comment);

        })
        .then(() => {
          postService.getContent().then((response) => {
            const content = response.data;
            for (let [index, post] of content.entries()) {
              commentService.getComments(post.id).then((response) => {
                content[index].Comments = response.data ? response.data : 0;
                commit("GET_COMMENT", content[index].Comments);
              });
            }
            commit("GET_CONTENT", content);
          });
        })
    },

    // Suppression d'un commantaire
    deleteComment({ commit }, comment) {
      commentService.deleteComment(comment)
        .then(console.log('commentaire supprimé'))
        .then(() => {
          postService.getContent().then((response) => {
            const content = response.data;
            for (let [index, post] of content.entries()) {
              commentService.getComments(post.id).then((response) => {
                content[index].Comments = response.data ? response.data : 0;
                commit("GET_COMMENT", content[index].Comments);
              });
            }
            commit("GET_CONTENT", content);
          });
        });
    },


    // Likes
    likePost({ commit }, like) {
      likeService.likePost(like)
        .then(() => {
          postService.getContent().then((response) => {
            const content = response.data;
            for (let [index, post] of content.entries()) {
              commentService.getComments(post.id).then((response) => {
                content[index].Comments = response.data ? response.data : 0;
                commit("GET_COMMENT", content[index].Comments);
              });
            }
            commit("GET_CONTENT", content);
          });
        });
    },

    // Users
    getUserBoard({ commit }, user) {
      userService.getUserBoard(user).then((response) => {
        const user = response.data;
        commit("GET_PROFILE", user);

      })

    },

    updateUserPhoto({ commit }, user) {
      let olduser = JSON.parse(localStorage.getItem('user'))
      let token = olduser.token
      userService.updateUserPhoto(user)
        .then((response) => {
          const user = response.data.user;
          localStorage.setItem('user', JSON.stringify(
            {
              token: token,
              user,
              message: "photo modifiée !"
            }
          ))
          commit("GET_PROFILE", user);
        })
    },

    updateUserBio({ commit }, user) {
      let olduser = JSON.parse(localStorage.getItem('user'))
      console.log("user", olduser)
      let token = olduser.token
      userService.updateUserPhoto(user)
        .then((response) => {
          const user = response.data.user;
          console.log("raiponse", user)

          localStorage.setItem('user', JSON.stringify(
            {
              token: token,
              user,
              message: "photo modifiée !"
            }
          ))
          commit("GET_PROFILE", user);
        })
    },

    deleteUserProfile({ commit }, id) {
      userService.deleteUserProfile()
        .then(console.log('profil supprimé'))
        .then(() => {
          router.push("/goodbye");
        });
      commit("DELETE_PROFILE", id)
    },

  },
  modules: {
    auth
  }
})
