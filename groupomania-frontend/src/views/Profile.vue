<template>
  <div class="home">
    <div id="app">
      <logged-header />
      <h2>
        <strong>{{ user.username }}</strong>
      </h2>
      <div class="profile">
        <form class="photoprofile" @submit.prevent="newPhoto()">
          <img :src="user.photo" />
          <input
            type="file"
            id="file"
            ref="file"
            name="file"
            v-on:change="handleFileUpload()"
            multiple
          />
          <button type="submit">Modifier</button>
        </form>

        <div class="infoprofile">
          <p>
            <strong>Email:</strong>
            {{ user.email }}
          </p>
          <p>
            <strong>Description:</strong>
            {{ user.bio }}
          </p>
          <button type="submit" @click="visible = true">Modifier</button>
          <div v-if="visible">
            <form @submit.prevent="newBio()">
              <div>
                <label for="bio">Description :</label>
                <textarea id="bio" name="bio"></textarea>
              </div>
              <div class="button">
                <button type="submit">Mettre à jour</button>
              </div>
              <button id="x" v-if="visible" @click="visible = false">x</button>
            </form>

            <ul>
              <li v-for="(isAdmin, index) in user.isAdmin" :key="index">
                <strong>Admin:</strong> {{ isAdmin }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
          <button @click="delProfile()" >Supprimer mon profil</button>

  </div>
</template>

<script>
import LoggedHeader from "@/components/LoggedHeader";

export default {
  name: "Profile",
  data() {
    return {
      visible: false,
      selectedFile: null,
      file: "",
    };
  },
  components: {
    LoggedHeader,
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    this.$store.dispatch("getUserBoard");
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },

    newPhoto() {
      let formData = new FormData();
      formData.append("image", this.file);
      this.$store.dispatch("updateUserPhoto", formData)
        .then(function () {
          console.log("SUCCESS!!");
        })

        .catch(function () {
          console.log("FAILURE!!");
        });
    },
    newBio() {
      this.visible = false;
      const bio = document.getElementById("bio").value;
      let formData = new FormData();
      formData.append("bio", bio);
      this.$store.dispatch("updateUserBio", formData)
        .then(function () {
          console.log("SUCCESS!!");
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
    },
    delProfile() {
      this.$store.dispatch("deleteUserProfile");
      this.$store.dispatch("auth/logout");
    },
  },
};
</script>

<style scoped lang='scss'>
.home {
  h2 {
    margin-top: 20px;
  }
  .profile {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    margin-bottom:  20px;
    box-shadow: 2px 2px 2px 2px;
    border-radius: 1em;
    .photoprofile {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: auto;
      margin-right: auto;
      img {
        border-radius: 20px;
        width: 40%;
        margin-bottom: 20px;

      }
      button {
        margin-bottom: 20px;
      }
    }
    .infoprofile {
      text-align: left;
      p { 
        margin-left: 20px;
      }
      button {
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 20px;
        margin-left: 20px;
      }

    }
    button {
      margin-top: 20px;
      border-radius: 10px;
    }
  }
}
</style>