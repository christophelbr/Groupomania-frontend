<template>
  <div class="home">
    <div id="nav">
      <router-link to="/wall">Accueil</router-link> |
      <router-link to="/profile/{{ user.id }}">Mon profile</router-link> |
      <router-link to="/" @click.prevent="logOut">Déconnexion</router-link>
    </div>
    <div class="title">
      <img src="../assets/icon.svg" alt="logo goupomania" />
      <h1>Groupomania</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoggedHeader",
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  components: {},
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
    }
  }
};
</script>
