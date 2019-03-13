<template>
  <div class="home">
    <img class="logo" alt="logo" src="../assets/logo2.jpg" />
    <HelloWorld msg="Welcome to the CardMarket" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>

<style media="screen">
    .logo {
        width: 10%;
        max-height: 92vh
    }
</style>
