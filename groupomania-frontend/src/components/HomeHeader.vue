<template>
  <div class="home">
    <div id="nav">
      <router-link to="/">Accueil</router-link> |
      <router-link to="/login">Connexion</router-link> |
      <router-link to="/register">Inscription</router-link>
    </div>
    <div class="title">
      <img src="../assets/icon.svg" alt="logo goupomania" />
      <h1>Groupomania</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeHeader",
  components: {},
};
</script>



