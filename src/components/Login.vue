<template>
<main>
        <div class="login" id="login">
            <h1>Login</h1>
            <input id="username" type="text" name="username" v-model="input.email" placeholder="Username" />
            <input id="password" type="password" name="password" v-model="input.password" placeholder="Password" />
            <input id="submit" type="submit" v-on:click="login()" value="Login">

        </div>
        <div class="shadow"></div>
</main>
</template>

<script>
    // import Nav from './Nav.vue'
    const axios = require('axios');

    export default {
        name: 'login',
        data() {
            return {
                input: {
                    email: "",
                    password: ""
                }
            }
        },
        methods: {
            login() {
            let self = this;

            axios.post('http://localhost:1337/user/login', {
                email: this.input.email,
                password: this.input.password
              })
              .then(function (response) {
                const token = response.data.token;
                const user = response.data.user;
                localStorage.setItem('jwtToken', token);
                localStorage.setItem('userId', user.id);
                localStorage.setItem('isLoggedIn', true);
                self.$store.commit('changeState', true)

                // self.$router.push('/user/profile');
                console.log(localStorage.getItem("userId"));
              })
              .catch(function (error) {
                localStorage.setItem('jwtToken', false)
                localStorage.setItem('isLoggedIn', false)
                localStorage.setItem('userId', false);
                self.$store.commit('changeState', false)
                console.log(error);
              });
            },
        }
    }
</script>

<style scoped>

</style>
