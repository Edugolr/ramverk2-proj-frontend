<template>
  <div id="app">
      <template>
          <div >
          <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="/">Card Trader</b-navbar-brand>

            <b-navbar-toggle target="nav_collapse" />

            <b-collapse is-nav id="nav_collapse">
              <b-navbar-nav>
                <b-nav-item v-if="$store.getters.loginStatus === false" href="/user/login" >Login</b-nav-item>
                <b-nav-item v-if="$store.getters.loginStatus" href="/user/profile" >Depot</b-nav-item>
                <b-nav-item v-if="$store.getters.loginStatus" href="/market" >Market</b-nav-item>
              </b-navbar-nav>

              <!-- Right aligned nav items -->
              <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown  v-if="$store.getters.loginStatus" right>
                  <!-- Using button-content slot -->
                  <template slot="button-content"><em>User</em></template>
                  <b-dropdown-item href="/user/profile">Depot</b-dropdown-item>
                  <b-dropdown-item v-if="$store.getters.loginStatus"  v-on:click="logout()" href="/" >Logout</b-dropdown-item>
                </b-nav-item-dropdown>
                <v-gravatar v-if="$store.getters.loginStatus" :email="$store.getters.email" />
              </b-navbar-nav>
            </b-collapse>
          </b-navbar>
        </div>
      </template>
    <router-view />
  </div>
</template>

<script>
export default {
    methods: {
        logout() {
            localStorage.setItem('jwtToken', false)
            localStorage.setItem('isLoggedIn', false)
            localStorage.removeItem('userId');
            this.$store.commit('changeState', false)
        }
    },
    mounted() {

    }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
