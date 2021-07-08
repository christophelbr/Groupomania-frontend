<template>
  <div>
    <button v-on:click="visible = true">Commenter</button>

    <div v-if="visible">
      <form @submit.prevent="newComment()">
        <div>
          <textarea id="comment" name="comment"></textarea>
        </div>

        <div class="button">
          <button type="submit">Publier</button>
        </div>

        <button id="x" v-if="visible" @click="visible = false">x</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "comment-button",
  data() {
    return {
      visible: false,
    };
  },

  components: {},
  methods: {
    newComment(postId) {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;

      const comment = document.getElementById("comment").value;
      const API_URL = "http://localhost:3000/api/";
      console.log(`${API_URL}wall/post/${postId}`)

      axios
        .post(
          `${API_URL}wall/post/${postId}`,
          {
            comment,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        )
        .then((this.visible = false));
      // .then(this.$router.go());
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
  #x {
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
  font: 1em sans-serif;
  width: 300px;
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
</style>