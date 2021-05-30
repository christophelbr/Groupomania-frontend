<template>
  <div id="nav">
    <router-link to="/">Accueil</router-link> |
    <router-link to="/login">Connexion</router-link> |
    <router-link to="/register">Inscription</router-link>
  </div>
  <div id="app">
    <page-header />
  </div>
  <router-view />
</template>

<script>
import PageHeader from '@/components/Header.vue'
export default {
  name: 'app',
  components: {
    PageHeader
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: red;
    }
  }
}

.home {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;

  .title {
    display: flex;
    flex-direction: row;

    img {
      width: 50px;
      margin-left: auto;
    }
    h1 {
      color: red;
      margin-right: auto;
    }
  }
  form {
    margin-top: 50px;
    div {
      margin-bottom: 20px;
    }
  }
}
</style>
