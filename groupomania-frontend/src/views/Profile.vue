<template>
  <div class="home">
    <div id="app">
      <logged-header />
      <h2>
        <strong>{{ currentUser.user.username }}</strong>
      </h2>
      <div class="profile">
        <form class="photoprofile" @submit.prevent="newPhoto()">
          <img :src="currentUser.user.photo" />
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
            {{ currentUser.user.email }}
          </p>
          <p>
            <strong>Description:</strong>
            {{ currentUser.user.bio }}
            <button>Modifier</button>
          </p>
          <ul>
            <li
              v-for="(isAdmin, index) in currentUser.user.isAdmin"
              :key="index"
            >
              <strong>Admin:</strong> {{ isAdmin }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoggedHeader from "@/components/LoggedHeader";
import axios from "axios";


export default {
  name: "Profile",
  data () {
    return {
      selectedFile: null
    }
  },
  components: {
    LoggedHeader,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    newPhoto() {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
      let userId = user.user.id;
      console.log(user.user.id)

      const newPhoto = document.getElementById("file").value;
      const API_URL = "http://localhost:3000/api";
      

      console.log(newPhoto);
      console.log(userId);
      axios.post(`${API_URL}/profile/${userId}`,
            {
              newPhoto,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
              },
            }
          )
          //.then(this.$router.go());
      } 
  }
};
</script>

<style scoped lang='scss'>
.home {
  h2 {
    margin-top: 20px;
  }
  .profile {
    display: flex;
    flex-direction: row;
    width: 40%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    .photoprofile {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: auto;
      margin-right: auto;
      img {
        border-radius: 20px;
        width: 40%;
      }
    }
    .infoprofile {
      text-align: left;
    }
    button {
      margin-top: 20px;
      border-radius: 10px;
    }
  }
}
</style>