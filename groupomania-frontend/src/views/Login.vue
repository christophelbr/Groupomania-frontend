<template>
  <div class="home">
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

export default {
  name: "Login",
  data() {
    return {
      user: new User("", ""),
      //loading: false,
      message: "",
    };
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
    async loginUser() {
      console.log("user", this.user);
      //this.loading = true;
      /*      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }  */

      if (this.user.email && this.user.password) {
     
         
         await this.$store.dispatch("auth/login", this.user)
         .then(
          () => {           
            this.$router.push("/wall");
          },
        )
      } else {
        (error) => {
            //this.loading = false;
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
      }
      //  });
    },
  },
};
</script>