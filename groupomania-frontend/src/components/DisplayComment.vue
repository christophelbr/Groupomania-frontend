<template>
  <div>
    <div>
      <div > 
        <button class="comments" v-on:click="commentvisible = true">
          {{ comments.length }} 
          {{ isCommentaireOrCommentaires(comments) }}

        </button>

        <div v-if="commentvisible">
          <button id="closeComm" v-on:click="commentvisible = false">x</button>
          <div
            class="comment"
            v-for="comment of comments"
            :key="comment.postId"
          >
            <div>
              <span> {{ comment.username }} </span>
              <p>{{ comment.comment }}</p>

              <button
                
                v-if="isAdmin"
                @click="displayDeleteComment = true"
                class="corbeilleCom"
              >
                <img :id="comment.id" src="../assets/corbeille.png" alt="corbeille" />
              </button>

              <div v-if="displayDeleteComment  && getId() == comment.id">
                <p>Souhaitez-vous vraiment supprimer ce commentaire ?</p>
                <div>
                  <button @click="delComment(comment.id)">oui</button>
                  <button @click="displayDeleteComment = false">non</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  </div>
</template> 

<script>

export default {
  name: "display-comment",
  props: [
    "comments"
  ],
  computed: {
    isAdmin() {
      let user = JSON.parse(localStorage.getItem("user"));
      return user.user.isAdmin;
    },

  },

  data() {
    return {
      commentvisible: false,
      displayDeleteComment: false,
    };
  },

  methods: {
    getId() {
      let commentId = event.target.id;
      return commentId
    },
    
    isCommentaireOrCommentaires(comments) {
      return comments.length < 2 ? "Commentaire" : "Commentaires";
    },
    delComment(id) {
      this.$store.dispatch("deleteComment", id);
      this.displayDeleteComment = false;
    },
  },
};
</script>

<style lang="scss" scoped>
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
.corbeilleCom {
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
</style>