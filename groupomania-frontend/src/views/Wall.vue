<template>
  <div class="home">
    <div id="app">
      <logged-header />
    </div>

    <div class="wall">

      <new-post-button />

      <div class="post" v-for="item of content" :key="item.title">

        <h3>{{ item.title }}</h3>
        
        <div>
          <span>{{ item.username }}</span>
          <img class="miniature" :src="item.photo" />
        </div>
        
        <span>{{ item.updatedAt }}</span>
        
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
        
        <div class="likecomment">
          <span> {{ item.likes }} J'aime </span>

          <comment-button />

        </div>

        <button v-if="item.Comments.length > 1" class="comments" v-on:click="commentvisible = true">
          {{ item.Comments.length }} Commentaires
        </button>

        <button v-else-if="item.Comments.length == 1" class="comments" v-on:click="commentvisible = true">
          {{ item.Comments.length }} Commentaire
        </button>

        <button v-else class="comments">0 Commentaire</button>
        
        <div  v-if="commentvisible">
          <div class="comment" v-for="comment of item.Comments" :key="comment.postId">
            <div v-if="comment.postId == item.id">
              <span v-if="commentvisible"> {{ comment.username }} </span>
              <p >{{ comment.comment }}</p>
            </div>
          </div>

          <button v-on:click="commentvisible = false">x</button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoggedHeader from "@/components/LoggedHeader";
import PostService from "../services/post.service";
import NewPostButton from '../components/NewPostButton.vue';
import CommentButton from'../components/CommentButton';

export default {
  name: "Wall",
  data() {
    return {
      content: "",
      Comments: "",
      commentvisible: false,
    };
  },

  mounted() {
    // Récupération des posts
    PostService.getPublicContent().then(
      (response) => {
        this.content = response.data;
        for (let [index, post] of this.content.entries()) {
          this.displayComments(index, post);
        }
        console.log("TOTO", this.content);
      },

      (error) => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  },

  methods: {
    displayComments(index, post) {
      PostService.getComments(post.id).then((response) => {
        this.content[index].Comments = response.data ? response.data : 0;
      });
    },

    newPost() {
      console.log("newPost");
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
      button {
        border-radius: 20px;
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