<template>
  <div >
    <button :id="uuid" v-on:click="visible = true">Commenter</button>

    <div v-if="visible">
      <form @submit.prevent="newComment()">
        <div>
          <textarea
            id="comment"
            placeholder="Laisser un commentaire..."
          ></textarea>
        </div>

        <div class="button">
          <button type="submit">Publier</button>
        </div>

        <button class="x" v-if="visible" @click="visible = false">x</button>
      </form>
    </div>
  </div>
</template>

<script>

let uuid = 0;

export default {
  name: "comment-button",
  beforeCreate() {
    this.uuid = uuid.toString();
    uuid += 1;
  },
  data() {
    return {
      visible: false,
    };
  },
  
  components: {},
  methods: {
    newComment() {
      const getPostId = document.getElementById(this.uuid).parentElement;
      const postId = getPostId.id;
      this.$store.dispatch("postComment", postId);
      //this.$store.dispatch("getContent");
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  width: 100%;
  padding: 1em;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 15px;
  box-shadow: 2px 2px 2px 2px;
  border-radius: 1em;
  .x {
    width: 22px;
    border-style: none;
  }
}
form div + div {
  margin-top: 1em;
  span {
    text-align: right;
  }
}

label {
  display: inline-block;
  width: 90px;
  text-align: right;
}

input,
textarea {
  width: 90%;
  font: 1em sans-serif;
  box-sizing: border-box;
  border: 1px solid #999;
}

input:focus,
textarea:focus {
  border-color: #000;
}

textarea {
  vertical-align: top;
  height: 5em;
}

button {
  border-radius: 1em;
  width: 300px;
  text-align: center;
}
@media screen and (max-width: 1400px) {
    button {
  width: 100px;
}

  }
</style>











