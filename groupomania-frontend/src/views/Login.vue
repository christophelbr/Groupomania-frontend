<template>
  <div class="home">
    <div id="app">
      <home-header />
    </div>
    <form @submit.prevent="loginUser">
      <div class="form-group">
        <label>Adresse email</label>
        <input
          v-model="user.email"
          type="email"
          name="email"
          class="form-control form-control-lg"
        />
      </div>

      <div class="form-group">
        <label>Mot de passe</label>
        <input
          v-model="user.password"
          type="password"
          name="password"
          class="form-control form-control-lg"
        />
      </div>

      <button class="btn btn-dark btn-lg btn-block">Connexion</button>
    </form>
  </div>
</template>

<script>
import User from "../models/user";
import HomeHeader from "@/components/HomeHeader.vue";

export default {
  name: "Login",
  data() {
    return {
      user: new User("", ""),
      message: "",
    };
  },

  components: {
    HomeHeader,
  },

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/wall");
    }
  },

  methods: {
    loginUser() {
      if (this.user.email && this.user.password) {
        this.$store.dispatch("auth/login", this.user).then(() => {
          this.$router.push("/wall");
          console.log(this.$store.state.auth.status);
        });
      } else {
        console.log("nok");

        (error) => {
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        };
      }
    },
  },
};
</script>