<template>
    <div v-if="$store.getters.loginStatus" class="container mt-5">
        <b-container class="">
            <b-row>
                <b-col class="">
                    <h1>Depot</h1>
                    <!-- <img src="https://www.gravatar.com/avatar/HASH" alt="gravtar"> -->
                    <hr>
                </b-col>

            </b-row>
          <b-row>
            <b-col class="border-right border-dark">
                <div>
                    <h2>Cards</h2>
                    <b-card-group  >
                          <b-card v-for="card in depot.cards" deck
                          :title='card.player'
                          :img-src="'https://nhl.bamcontent.com/images/headshots/current/168x168/' + card.playerId + '.jpg'"
                          img-alt="Image"
                          img-top
                          tag="article"
                          style="max-width: 10rem;"
                          class="mb-2"
                        >
                          <b-card-text>
                              <p :id="card.id" >Value: {{card.price}}:-</p>
                          </b-card-text>
                          <div slot="footer"><small class="text-muted">
                              <b-button  v-on:click="sell(card.player)" variant="danger">Sell card</b-button>
                          </small></div>
                        </b-card>
                      </b-card-group>
                </div>
            </b-col>
            <b-col>
                <h2>Balance</h2>
                <b-alert variant="success" show> <pre>Balance: {{depot.balance}}:-</pre>
                <b-form-input v-model="input.amount" size="sm" class="mr-sm-2" type="text" placeholder="Add money" /><br>
                <b-button size="sm" variant="info" class="my-2 my-sm-0" type="submit" v-on:click="addMoney()">Add</b-button></b-alert>
            </b-col>
          </b-row>
        </b-container>
<!--
        <b-container class="bv-example-row">
          <b-row>
            <b-col><img src="https://www.gravatar.com/avatar/HASH" alt="gravtar"></b-col>
            <b-col><p>{{user.firstname}}  {{user.lastname}}</p></b-col>
          </b-row>
        </b-container>
        <b-container class="bv-example-row">
          <b-row>

          </b-row>

        </b-container>
        <div class="header">
            <div class="gravatar">
            </div>
            <div class="name">
            </div>
        </div> -->

    </div>
    <div v-else class="">
        You are not logged in
    </div>


</template>

<script>
// @ is an alias to /src


export default {
  name: "profile",
  components: {

  },
  data() {
    return {
        input: {
            amount: ""
        },
      userId: localStorage.getItem('userId'),
      user: [],
      depot: [],
      balance: 0
    }
  },
  methods: {
      addMoney() {
          let self = this;
          axios.defaults.headers.common['Authorization'] =
                              'Bearer ' + localStorage.getItem('jwtToken');
          axios({
            method: 'post',
            url: 'http://localhost:1337/depot/addmoney/',
            withCredentials: false,
            crossdomain: true,
            data: {
                depotId: self.user.depots[0].id,
                amount: self.input.amount
            }
          })
            .then(function (res) {
                self.depot = res.data
              console.log(res);
            })
            .catch(function (error) {
              console.log(error);
            });
        },
        sell(name) {
            let self = this;
            axios.defaults.headers.common['Authorization'] =
                                'Bearer ' + localStorage.getItem('jwtToken');
            axios({
              method: 'post',
              url: 'http://localhost:1337/card/sell',
              withCredentials: false,
              crossdomain: true,
              data: {
                  userId: localStorage.getItem('userId'),
                  name: name
              }
            })
              .then(function (res) {
                  self.depot = res.data[0]
                console.log(res.data);
              })
              .catch(function (error) {
                console.log(error);
              });
          }
  },
  mounted () {
        let self = this;
        if (localStorage.getItem('userId')) {
          axios.defaults.headers.common['Authorization'] =
                              'Bearer ' + localStorage.getItem('jwtToken');
            axios.get('http://localhost:1337/user/' + localStorage.getItem('userId'))
            .then((res) => {
                self.user = res.data
              return axios.get('http://localhost:1337/depot/' + self.user.depots[0].id);
            })
            .then((res) => {
                self.depot = res.data
                console.log(this.depot);
            })
            .catch((err) => {
                console.log(err)
            });
        }
        self.$io.socket.get('/card', function serverResponded (body, JWR) {

            console.log('Sails responded with: ', body);
            console.log('with headers: ', JWR.headers);
            console.log('and with status code: ', JWR.statusCode);

        }),
        self.$io.socket.on('card', function(msg){

             // call it again after one second
             if (self.depot.cards) {
                 for (var i = 0; i < self.depot.cards.length; i++) {

                     if (self.depot.cards[i].id == msg.data.id) {
                         self.depot.cards[i].price = msg.data.price
                     }
                 }
             }

        })
      // axios
      //   .get('http://localhost:1337/user/' + this.id)
      //   .then(response => (this.user = response.data))
      //   .catch(error => console.log(error))
  }
};
</script>
<style media="screen">
    .teamLogo {

    }
    .cards {
    }
</style>
