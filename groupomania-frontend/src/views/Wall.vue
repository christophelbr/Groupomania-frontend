<template>
  <div class="home">
    <div id="app">
      <logged-header />
    </div>

    <div class="wall">

      <new-post-button />
      
      <!-- Affichage d'une publication -->
      <div class="post" v-for="item of content" :key="item.title">
        <h3>{{ item.title }}</h3>
        <div>
          <span>{{ item.User.username }}</span>

          <img v-if="item.User.photo" class="miniature" :src="item.User.photo" />
        </div>

        <span>{{ item.createdAt }}</span>

        <div>
          <img
            v-if="isImage(item.attachment)"
            class="attachment"
            :src="item.attachment"
          />
          <video
            v-if="isVideo(item.attachment)"
            class="attachment"
            :src="item.attachment"
            width="320"
            height="240"
            controls
          />
          <p>{{ item.content }}</p>
        </div>
        <!-- Fin affichage publication -->

        <!-- Like -->
        <div class="likecomment">
          <div>
            <button @click="like(item.id)" id="pouce">
              <img src="../assets/pouce.png" alt="pouce" /></button
            ><span> {{ item.likes }} </span>
          </div>
        <!-- Fin Like -->

          <comment-button class="commenter" :id="item.id" />
        </div>
        <div class="downPost">
          <div style="display: none">{{ comments }}</div>

          <display-comment :comments="item.Comments" />


          <!-- Fin affichage et suppression des commentaires  -->

          <!-- Suppression d'un Post -->
          <div>
            <button
              v-if="user.id === item.UserId"
              @click="displayDeletePost = true"
              class="corbeille"
            >
              <img :id="item.id + 0.1" src="../assets/corbeille.png" alt="corbeille" />
            </button>
            <button
              :id="item.id + 0.1"
              v-else-if="isAdmin"
              @click="displayDeletePost = true"
              class="corbeille"
            >
              <img :id="item.id + 0.1" src="../assets/corbeille.png" alt="corbeille" />
            </button>

            <div v-if="displayDeletePost && getPostId() == item.id + 0.1">
              <p>Souhaitez-vous vraiment supprimer ce post ?</p>
              <div>
                <button @click="delPost(item.id)">oui</button>
                <button @click="displayDeletePost = false">non</button>
              </div>
            </div>
          </div>
          <!-- Fin suppression d'un Post -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoggedHeader from "@/components/LoggedHeader";
import NewPostButton from "../components/NewPostButton.vue";
import CommentButton from "../components/CommentButton";
import DisplayComment from '../components/DisplayComment.vue';

export default {
  name: "Wall",
  computed: {
    content() {
      return this.$store.getters.content;
    }, 
    comments() {
      return this.$store.getters.comments;
    }, 
    user() {
      return this.$store.getters.user;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    isAdmin() {
      let user = JSON.parse(localStorage.getItem("user"));
      return user.user.isAdmin;
    },
  },

  data() {
    return {
      commentvisible : false,
      displayDeletePost: false,
      displayDeleteComment: false,
    };
  },

  beforeCreate() {
    this.$store.dispatch("getContent");
    this.$store.dispatch("getUserBoard");    

  },

  methods: {
    isCommentaireOrCommentaires(Comments){
      return Comments.length < 2 ? 'Commentaire' : 'Commentaires';
    },
    isModerator() {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user.isAdmin == "true") {
        return true;
      }
    },

    isImage(attachment) {
      var reg = /(?:\.([^.]+))?$/;
      const extension = reg.exec(attachment)[1];
      const listExtension = ["jpg", "png", "jpeg"];
      return listExtension.includes(extension);
    },

    isVideo(attachment) {
      var reg = /(?:\.([^.]+))?$/;
      const extension = reg.exec(attachment)[1];
      const listExtension = ["mp4"];
      return listExtension.includes(extension);
    },

    like(id) {
      this.$store.dispatch("likePost", id);
    },

    delComment(id) {
      this.$store.dispatch("deleteComment", id);
      this.displayDeleteComment = false;
    },

    delPost(id) {
      this.$store.dispatch("deletePost", id);
      this.displayDeletePost = false;
    },
    
    getPostId() {
      let postId = event.target.id;
      return postId;
    },
  },

  components: {
    LoggedHeader,
    NewPostButton,
    CommentButton,
    DisplayComment

  },
};
</script>
<style scoped lang="scss" >
.wall {
  width: 100%;
  .post {
    width: 30%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 15px;
    margin-top: 20px;
    padding-bottom: 15px;
    box-shadow: 2px 2px 2px 2px;
    border-radius: 1em;
    .comments {
      border-style: none;
      background-color: white;
    }
    .comment {
      width: 90%;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 15px;
      margin-top: 20px;
      box-shadow: 2px 2px 2px 2px;
      border-radius: 1em;
    }
    .likecomment {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      padding-bottom: 10px;
      .commenter {
        width: 80%;
      }
      #pouce {
        border-style: none;
        background-color: white;
      }
      button {
        border-radius: 20px;
      }
      img {
        height: 35px;
      }
    }

    .downPost {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      #closeComm {
        float: right;
        margin-right: 0px;
        padding-bottom: -18px;

        border: none;
        background: white;
      }
      img {
        width: 50px;
      }
      #corbeilleCom {
        border: none;
        background: white;
        img {
          width: 35px;
        }
      }
      .corbeille {
        border-style: none;
        background-color: white;
        float: right;
      }
    }

    .miniature {
      width: 35px;
      height: 35px;
      border-radius: 20px;
    }

    .attachment {
      width: 100%;
      height: 100%;
    }
  }
  @media screen and (max-width: 1400px) {
    .post {
      width: 60%;
    }
  }
  @media screen and (max-width: 650px) {
    .post {
      width: 90%;
    }
  }
}
</style>