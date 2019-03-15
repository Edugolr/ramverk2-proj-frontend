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

                          <div slot="footer"><small class="text-muted">
                               <p class="balance text-center text-monospace font-weight-bold">${{card.price.toFixed(2)}}</p>
                              <b-button  v-on:click="sell(card.player)" variant="danger">Sell card</b-button>
                          </small></div>
                        </b-card>
                      </b-card-group>
                </div>
            </b-col>
            <b-col>
                <h2>Balance</h2>
                <b-alert variant="success" show>
                    <p class="mx-auto balance text-center text-monospace font-weight-bold">${{depot.balance.toFixed(2)}}</p></b-alert>
                <b-form @submit="addMoney">
                  <b-input-group
                    id="exampleInputGroup1"
                    prepend="$" append=".00"

                    >
                    <b-input-group-text slot="append"><strong class="text-danger">!</strong></b-input-group-text>
                    <b-form-input
                      id="addmoney"
                      type="number"
                      v-model="input.amount"
                      required
                      placeholder="Enter amount to deposit" />
                  </b-input-group><br>
                   <b-button variant="success" type="submit" >Add money</b-button>
              </b-form>

            </b-col>
          </b-row>
        </b-container>
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
      addMoney(evt) {
          evt.preventDefault();
          alert("Your balance increased with: " + this.input.amount + ":-")
          let self = this;
          axios.defaults.headers.common['Authorization'] =
                              'Bearer ' + localStorage.getItem('jwtToken');
          axios({
            method: 'post',
            url: 'https://backend.chai17.me/depot/addmoney/',
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
              url: 'https://backend.chai17.me/card/sell',
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
            axios.get('https://backend.chai17.me/user/' + localStorage.getItem('userId'))
            .then((res) => {
                self.user = res.data
              return axios.get('https://backend.chai17.me/depot/' + self.user.depots[0].id);
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
        self.$io.socket.get('/card/subscribe', function(res) {
              console.log(res);
          });
        self.$io.socket.on('card', function(msg){

             // call it again after one second
             if (self.depot.cards) {
                 for (var i = 0; i < self.depot.cards.length; i++) {

                     if (self.depot.cards[i].id == msg.id) {
                         self.depot.cards[i].price = msg.price
                     }
                 }
             }

        })
      // axios
      //   .get('https://backend.chai17.me/user/' + this.id)
      //   .then(response => (this.user = response.data))
      //   .catch(error => console.log(error))
  }
};
</script>
<style media="screen">
.balance {
    font-size: large;
}
</style>
