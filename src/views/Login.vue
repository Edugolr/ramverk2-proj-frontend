<template>
<main>
        <div class="login" id="login">
            <h1>Login</h1>
            <input id="username" type="text" name="username" v-model="log.email" placeholder="Email" />
            <input id="password" type="password" name="password" v-model="log.password" placeholder="Password" />
            <b-button id="submit" variant="success" type="submit" v-on:click="login()" >Login</b-button>

        </div>
        <div class="register" id="register">
            <h1>Register</h1>
            <input id="regusername" type="text" name="username" v-model="reg.email" placeholder="Email" />
            <input id="regfirstname" type="text" name="firstname" v-model="reg.firstname" placeholder="Firstname" />
            <input id="regpassword" type="password" name="password" v-model="reg.password" placeholder="Password" />
            <b-button id="regsubmit" variant="info" type="submit" v-on:click="register()" >Register</b-button>

        </div>
</main>
</template>

<script>
    // import Nav from './Nav.vue'
    const axios = require('axios');

    export default {
        name: 'login',
        data() {
            return {
                reg: {
                    email: "",
                    password: "",
                    firstname: ''
                },
                log: {
                    email: "",
                    password: ""
                }
            }
        },
        methods: {
            login() {
            let self = this;

            axios.post('http://localhost:1337/user/login', {
                email: this.log.email,
                password: this.log.password
              })
              .then(function (response) {
                const token = response.data.token;
                const user = response.data.user;
                localStorage.setItem('jwtToken', token);
                localStorage.setItem('userId', user.id);
                localStorage.setItem('isLoggedIn', true);
                self.$store.commit('changeState', true);
                self.$store.commit('changeEmail', user.email)

                self.$router.push('/user/profile');
                console.log(localStorage.getItem("userId"));
              })
              .catch(function (error) {
                localStorage.setItem('jwtToken', false)
                localStorage.setItem('isLoggedIn', false)
                localStorage.setItem('userId', false);
                localStorage.setItem('email', false)
                self.$store.commit('changeState', false)
                self.$store.commit('changeEmail', false)
                console.log(error);
              });
            },
            register() {
                let self = this;

                axios.post('http://localhost:1337/user/register', {
                    email: this.reg.email,
                    password: this.reg.password,
                    firstname: this.reg.firstname
                  })
                  .then(function (response) {

                    console.log(response.data);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
            }
        }
    }
</script>

<style scoped>

</style>
