<template>
  <div id="app">
    <landing-page></landing-page>
  </div>
</template>

<script>
  import LandingPage from '@/components/LandingPage'

  export default {
    name: 'kiosktron',
    components: {
      LandingPage
    }
  }
</script>

<style>
  @import './style/css/reset';
  @import './style/css/kiosk';
  /* CSS */
</style>
