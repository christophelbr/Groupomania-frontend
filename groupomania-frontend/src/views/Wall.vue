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
          <span>{{ item.username }}</span>
          <img v-if="item.photo" class="miniature" :src="item.photo" />
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

          <comment-button :id="item.id" />
        </div>

        <div class="downPost">

          <!-- Affichage et suppression des commentaires -->
          <button v-if="item.Comments.length > 1" class="comments" v-on:click="commentvisible = true" >
            {{ item.Comments.length }} Commentaires
          </button>

          <button v-else-if="item.Comments.length == 1" class="comments" v-on:click="commentvisible = true" >
            {{ item.Comments.length }} Commentaire
          </button>

          <button v-else class="comments">0 Commentaire</button>

          <div v-if="commentvisible">
            <button id="closeComm" v-on:click="commentvisible = false">
              x
            </button>

            <div class="comment" v-for="comment of item.Comments" :key="comment.postId" >
              <div v-if="comment.postId == item.id">
                <span v-if="commentvisible"> {{ comment.username }} </span>
                <p>{{ comment.comment }}</p>

                <button @click="displayDeleteComment = true" v-if="isAdmin" id="corbeilleCom">
                  <img src="../assets/corbeille.png" alt="corbeille" />
                </button> 

                <div v-if="displayDeleteComment">
                  <p>Souhaitez-vous vraiment supprimer ce commentaire ?</p>
                  <div>
                    <button>oui</button>
                    <button @click="displayDeleteComment = false">non</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Fin affichage et suppression des commentaires  -->

          <!-- Suppression d'un Post -->
          <div>
            <button
              v-if="user.id === item.UserId"
              @click="displayDeletePost = true"
              id="corbeille"
            >
              <img src="../assets/corbeille.png" alt="corbeille" />
            </button>
            <button
              v-else-if="isAdmin"
              @click="displayDeletePost = true"
              id="corbeille"
            >
              <img src="../assets/corbeille.png" alt="corbeille" />
            </button>

            <div v-if="displayDeletePost">
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

export default {
  name: "Wall",
  computed: {
    content() {
      return this.$store.getters.content;
    },
    post() {
      return this.$store.getters.post;
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
      commentvisible: false,
      displayDeletePost: false,
      displayDeleteComment: false,
    };
  },

  mounted() {
    this.$store.dispatch("getContent");
    this.$store.dispatch("getUserBoard");
    let user = JSON.parse(localStorage.getItem("user"));
    console.log(user.user.isAdmin);
  },

  methods: {
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
      console.log("TOTO", id);
      this.$store.dispatch("likePost", id);
    },

    delPost(id) {
      this.$store.dispatch("deletePost", id);
      this.displayDeletePost = false;
    },
  },

  components: {
    LoggedHeader,
    NewPostButton,
    CommentButton,
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
      #corbeille {
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
}
</style>