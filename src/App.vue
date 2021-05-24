<template>
  <router-view />
</template>

<script>

export default {
  name: 'App',
}
</script>

<style lang="stylus">

  @font-face {
    font-family: Messapia-Bold;
    src: url('./assets/fonts/Messapia-Bold.otf');
  }
  @font-face {
    font-family: Messapia-Regular;
    src: url('./assets/fonts/Messapia-Regular.otf');
  }
 
  :root
    font-family Messapia-Bold
    background-color #000
  
  body
    margin 0
    color color-light
</style>