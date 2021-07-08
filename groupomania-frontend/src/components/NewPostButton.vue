<template>
  <div>
    <button id="addpub" v-on:click="visible = true">
      Ajouter une publication
    </button>

    <div v-if="visible">
      <form @submit.prevent="newPost()">
        <div>
          <label for="title">Titre :</label>
          <input type="text" id="title" name="title" />
        </div>

        <div>
          <label for="content">Message :</label>
          <textarea id="content" name="content"></textarea>
        </div>

        <div>
          <label for="file">Média : </label>
          <input
            type="file"
            id="file"
            ref="file"
            name="file"
            v-on:change="handleFileUpload()"
            multiple
          />
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
  name: "new-post-button",
  data() {
    return {
      visible: false,
      file: "",
    };
  },

  components: {},
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },

    newPost() {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;

      const title = document.getElementById("title").value;
      const content = document.getElementById("content").value;
      const attachment = document.getElementById("file").value;
      const API_URL = "http://localhost:3000/api/";
      const text = JSON.stringify({title, content});
      console.log(text);

      console.log(attachment);

      let formData = new FormData();
        formData.append("image", this.file);
        formData.append("title", title);
        formData.append("content", content);

        axios
          .post(
            `${API_URL}wall/post`,
            formData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
              },
            }
          )
          .then(function () {
            console.log("SUCCESS!!");
          })
          .then(this.$router.go())

          .catch(function () {
            console.log("FAILURE!!");
          });

      /* if (attachment == "") {
        axios
          .post(
            `${API_URL}wall/post`,
            {
              title,
              content,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
              },
            }
          )
          .then((this.visible = false))
          .then(this.$router.go());
      } else {
        let formData = new FormData();
        formData.append("image", this.file);
        axios
          .post(
            `${API_URL}wall/post`,
            {
              title,
              content,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
              },
            }
          )
          .then(function () {
            console.log("SUCCESS!!");
          })
          //.then(this.$router.go())

          .catch(function () {
            console.log("FAILURE!!");
          });
      } */
    },
  },
};
</script>

<style lang="scss" scoped>
#addpub {
  margin-top: 20px;
}
form {
  width: 30%;
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
  /* Pour être sûrs que toutes les étiquettes ont même taille et sont correctement alignées */
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