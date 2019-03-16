<template>
    <div class="depot">
        <b-container class="bv-example-row mt-5">
            <b-row>
                <b-col>
                    <h1>CardMarket</h1>
                    <hr>
                </b-col>
            </b-row>
          <b-row>
            <b-col class="border-right border-dark">
                <div>
                    <h2>Cards</h2>
                    <b-card-group>
                          <b-card v-for="card in cards" deck
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
                                 <b-button v-if="card.owner" v-on:click="" variant="danger">Sold</b-button>
                                 <b-button v-else v-on:click="buy(card.player)" variant="success">Buy card</b-button>
                             </small></div>
                          </b-card>
                      </b-card-group>
                </div>
            </b-col>
            <b-col>
                <!-- <CardChart/> -->
                <h2>Chart</h2>
                <div id="container" style="width:100%; height:400px;"></div>
            </b-col>
          </b-row>
        </b-container>





    </div>
</template>

<script>
// @ is an alias to /src
import CardChart from '@/components/CardChart.vue'
var Highcharts = require('highcharts/highstock');

// Load Highmaps as a module
require('highcharts/modules/map')(Highcharts);
var moment = require('moment');
export default {

  name: "market",
  // components: {
  //     CardChart
  // },
  data() {
    return {
        cards: [],
        chart: null
    }
  },
  methods: {
      buy(name) {
          let self = this;
          axios.defaults.headers.common['Authorization'] =
                              'Bearer ' + localStorage.getItem('jwtToken');
          axios({
            method: 'post',
            url: 'https://backend.chai17.me/card/buy',
            withCredentials: false,
            crossdomain: true,
            data: {
                userEmail: localStorage.getItem('userEmail'),
                name: name
            }
          })
            .then(function (res) {
                self.getNotOwnedCards()
            })
            .catch(function (error) {
              console.log(error);
            });
        },
        getNotOwnedCards() {
            let self = this;
                axios.defaults.headers.common['Authorization'] =
                                  'Bearer ' + localStorage.getItem('jwtToken');
                axios.get('https://backend.chai17.me/card/')
                .then((res) => {
                    self.cards = res.data

                })
                .catch((err) => {
                    console.log(err)
                });
        }
  },
  mounted () {
      let self = this;

          axios.defaults.headers.common['Authorization'] =
                            'Bearer ' + localStorage.getItem('jwtToken');
          axios.get('https://backend.chai17.me/card/')
          .then((res) => {
              self.cards = res.data
              // console.log(self.cards);
          })
          .catch((err) => {
              console.log(err)
          });

          self.chart = Highcharts.chart('container', {
              chart: {
                  type: 'line',
                  events: {
                      load: self.chart
                  }
              },
              title: {
                  text: 'Live price chart'
              },
              xAxis: {
                  type: 'datetime',
                  tickPixelInterval: 1,
                  maxZoom: 10 * 1000
              },
              yAxis: {
                  minPadding: 0.2,
                  maxPadding: 0.2,
                  title: {
                      text: 'Price',
                      margin: 80
                  }
              },
              plotOptions: {
                series: {
                    pointStart: moment().local(),
                    pointInterval: 1000 // one second
                }
            },
              series: [
                  {
                      name: 'Jake Allen',
                      data: [],
                      visible: false

                },
                {
                    name: 'Tage Thompson',
                    data: [],
                    visible: false,
                },
                {
                    name: 'Joe Sakic',
                    data: []
                }
            ]
          });

        self.$io.socket.get('/card', function serverResponded (body, JWR) {

            console.log('Sails responded with: ', body);
            console.log('with headers: ', JWR.headers);
            console.log('and with status code: ', JWR.statusCode);
        }),
        self.$io.socket.get('/card/subscribe', function(res) {
              console.log(res);
          });

        self.$io.socket.on('card', function(msg){
            // console.log(msg);
            // console.log(self.chart);
             // call it again after one second
            for (var i = 0; i < self.cards.length; i++) {
                var series = self.chart.series[i],

                 shift = series.data.length > 200;


                if (self.cards[i].id == msg.id) {
                    self.chart.series[i].addPoint(msg.price, true);
                    self.cards[i].price = msg.price
                }

            }
        })

        }
      // axios
      //   .get('https://backend.chai17.me/user/' + this.id)
      //   .then(response => (this.user = response.data))
      //   .catch(error => console.log(error))
};
</script>
<style media="screen">

</style>
