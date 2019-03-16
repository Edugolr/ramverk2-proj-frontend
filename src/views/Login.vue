<template>
<main>
    <div>
        <b-card class="formCard" no-body>
            <b-tabs card v-model="tabIndex">
                <b-tab title="Login" active>
                    <b-form @submit="login" @reset="onReset" v-if="show">
                     <b-form-group
                       id="exampleInputGroup1"
                       label="Email address:"
                       label-for="exampleInput1"
                       description="We'll never share your email with anyone else."
                     >
                       <b-form-input
                         id="emailLogin"
                         type="email"
                         v-model="log.email"
                         required
                         placeholder="Enter email" />
                     </b-form-group>

                     <b-form-group
                        id="exampleInputGroup2"
                        label="Your password:"
                        label-for="exampleInput2"
                        description="We'll never share your password with anyone else."
                        >
                       <b-form-input
                         id="passwordLogin"
                         type="password"
                         v-model="log.password"
                         required
                         placeholder="Enter password" />
                     </b-form-group>
                     <b-button id="submitLogin" variant="success" type="submit">Login</b-button>
                     <b-button id="submitReset" class="ml-2" type="reset" variant="danger">Reset</b-button>
                 </b-form>

                </b-tab>
                <b-tab title="Register">
                    <b-form @submit="register" @reset="onReset" v-if="show">
                     <b-form-group
                       id="exampleInputGroup1"
                       label="Email address:"
                       label-for="email"
                       description="We'll never share your email with anyone else."
                     >
                       <b-form-input
                         id="email"
                         type="email"
                         v-model="reg.email"
                         required
                         placeholder="Enter email" />
                     </b-form-group>
                     <b-form-group
                       id="exampleInputGroup1"
                       label="Firstname:"
                       label-for="firstname"
                     >
                       <b-form-input
                         id="firstname"
                         type="text"
                         v-model="reg.firstname"
                         required
                         placeholder="Enter your firstname" />
                     </b-form-group>

                     <b-form-group
                        id="exampleInputGroup2"
                        label="Your password:"
                        label-for="password"
                        description="We'll never share your password with anyone else."
                        >
                       <b-form-input
                         id="password"
                         type="password"
                         v-model="reg.password"
                         required
                         placeholder="Enter password" />
                     </b-form-group>
                     <b-button class="" variant="success" type="submit" >Register</b-button>
                     <b-button class="ml-2" type="reset" variant="danger">Reset</b-button>
                    <b-alert
                       :show="registered"
                       dismissible
                       variant="danger"

                    >
                        Registration failed
                    </b-alert>
                    <b-alert
                       :show="dismissCountDown"
                       dismissible
                       variant="success"
                       @dismissed="dismissCountDown=0"
                       @dismiss-count-down="countDownChanged"
                    >
                        Registrated directing to login tab {{ dismissCountDown }}
                    </b-alert>
                </b-form>
                </b-tab>
            </b-tabs>
        </b-card>
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
                dismissSecs: 2,
                show: true,
                dismissCountDown: 0,
                registered: false,
                tabIndex: 0,
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
            onReset(evt) {
                evt.preventDefault()
                /* Reset our form values */
                this.log.email = ''
                this.log.password = ''
                this.reg.email = ''
                this.reg.password = ''
                this.log.firstname = ''

                /* Trick to reset/clear native browser form validation state */
                this.show = false
                this.$nextTick(() => {
                  this.show = true
                })
            },
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown
              },
            login(evt) {
                evt.preventDefault()
            let self = this;

            axios.post('https://backend.chai17.me/user/login', {
                email: self.log.email,
                password: self.log.password
              })
              .then(function (response) {
                const token = response.data.token;
                const user = response.data.user;
                localStorage.setItem('jwtToken', token);
                localStorage.setItem('userId', user.id);
                localStorage.setItem('userEmail', user.email);
                localStorage.setItem('isLoggedIn', true);
                self.$store.commit('changeState', true);
                self.$store.commit('changeEmail', user.email)

                self.$router.push('/user/profile');
                console.log(localStorage.getItem("jwtToken"));
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
            register(evt) {
                evt.preventDefault()
                let self = this;

                axios.post('https://backend.chai17.me/user/register', {
                    email: self.reg.email,
                    password: self.reg.password,
                    firstname: self.reg.firstname
                  })
                  .then(function (response) {
                      self.dismissCountDown = self.dismissSecs
                      setTimeout(function(){
                        self.tabIndex--
                    }, 2000);

                    console.log(response.data);
                  })
                  .catch(function (error) {
                      self.registered = true
                        setTimeout(function(){
                          self.registered = false
                      }, 3000);
                    console.log(error);
                  });
            }
        }
    }
</script>

<style scoped>
.formCard {
    width: 70%;
    margin: auto;
}
.tab-pane {
    width: 80%;
    margin: auto;
}
</style>
