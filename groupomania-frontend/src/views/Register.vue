<template>
  <div class="home">
    <div id="app">
      <home-header />
    </div> 
    <form name="form" @submit.prevent="handleRegister">

      <div class="form-group">
        <label>Pseudo</label>
        <input v-model="user.username" name='username' type="text" class="form-control form-control-lg" />
      </div>

      <div class="form-group">
        <label>Adresse mail</label>
        <input v-model="user.email" name="email" type="email" class="form-control form-control-lg" />
      </div>

      <div class="form-group">
        <label>Mot de passe</label>
        <input v-model="user.password" name='password' type="password" class="form-control form-control-lg" />
      </div>

      <button type="submit" class="btn btn-dark btn-lg btn-block">
        Inscription
      </button>

    </form>
  </div>
</template>

<script>
import User from '../models/user';
import HomeHeader from '@/components/HomeHeader.vue'


export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', ''),
      submitted: false,
      successful: false,
      message: ''
    };
  },
  components: {
    HomeHeader
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/wall');
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
        if ((this.user.email && this.user.username && this.user.password)) {
          this.$store.dispatch('auth/register', this.user).then(() => {
          this.$store.dispatch("auth/login", this.user).then(() => {
          this.$router.push("/wall");
          console.log(this.$store.state.auth.status);
        });
        })
      
        } else {
        (error) => {
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        };
      }
    }
  }
};
</script>
