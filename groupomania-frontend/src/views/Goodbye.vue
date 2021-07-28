<template>
  <div class="home">
    <div id="app">
      <home-header />
      <h2> Votre profil a bien été supprmé! </h2>
        <p> Vous allez nous manquer !</p>
    </div>
  </div>
</template>

<script>
import HomeHeader from '@/components/HomeHeader.vue'
export default {
  name: 'app',
  components: {
    HomeHeader
  }
}
</script>

<style scoped lang='scss'>

</style>