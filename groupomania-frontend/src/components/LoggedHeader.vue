<template>
  <div class="home">
    <div id="nav">
      <router-link to="/wall">Accueil</router-link> |

      <router-link :to="{ name: 'Profile', params: { id: user.id } }"
        >Mon profile</router-link
      >
      |
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
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
  },

  components: {},
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
    },
  },
};
</script>
