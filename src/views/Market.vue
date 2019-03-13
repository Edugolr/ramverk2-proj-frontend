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
                            <b-card-text>
                                <p :id="card.id">Value: {{card.price}}:-</p>
                            </b-card-text>
                             <div slot="footer"><small class="text-muted">
                                 <b-button v-if="card.owner" v-on:click="" variant="danger">Sold</b-button>
                                 <b-button v-else v-on:click="buy(card.player)" variant="success">Buy card</b-button>
                             </small></div>
                          </b-card>
                      </b-card-group>
                </div>
            </b-col>
            <b-col>
                <h1>Chart</h1>
                <div id="container" style="width:100%; height:400px;"></div>
            </b-col>
          </b-row>
        </b-container>





    </div>
</template>

<script>
// @ is an alias to /src

var Highcharts = require('highcharts/highstock');

// Load Highmaps as a module
require('highcharts/modules/map')(Highcharts);
var moment = require('moment');
export default {

  name: "market",
  data() {
    return {
        cards: [],
        chart: JSON.parse(localStorage.getItem('chart')) || null
    }
  },
  methods: {
      buy(name) {
          let self = this;
          axios.defaults.headers.common['Authorization'] =
                              'Bearer ' + localStorage.getItem('jwtToken');
          axios({
            method: 'post',
            url: 'http://localhost:1337/card/buy',
            withCredentials: false,
            crossdomain: true,
            data: {
                userId: localStorage.getItem('userId'),
                name: name
            }
          })
            .then(function (res) {
                self.getNotOwnedCards()
              console.log(res.data);
            })
            .catch(function (error) {
              console.log(error);
            });
        },
        getNotOwnedCards() {
            let self = this;
                axios.defaults.headers.common['Authorization'] =
                                  'Bearer ' + localStorage.getItem('jwtToken');
                axios.get('http://localhost:1337/card/')
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
          axios.get('http://localhost:1337/card/')
          .then((res) => {
              self.cards = res.data
              console.log(self.cards);
          })
          .catch((err) => {
              console.log(err)
          });
          localStorage.setItem('chart', JSON.stringify(self.chart))
          document.addEventListener('DOMContentLoaded', function() {
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

                },
                {
                    name: 'Tage Thompson',
                    data: []
                },
                {
                    name: 'Joe Sakic',
                    data: []
                }
            ]
          });
      });
        self.$io.socket.get('/card', function serverResponded (body, JWR) {

            console.log('Sails responded with: ', body);
            console.log('with headers: ', JWR.headers);
            console.log('and with status code: ', JWR.statusCode);

        }),

        self.$io.socket.on('card', function(msg){

             // call it again after one second
            for (var i = 0; i < self.cards.length; i++) {
                var series = self.chart.series[i],

                 shift = series.data.length > 200;


                if (self.cards[i].id == msg.data.id) {
                    self.chart.series[i].addPoint(msg.data.price, true);
                    self.cards[i].price = msg.data.price
                }

            }
        })
        }
      // axios
      //   .get('http://localhost:1337/user/' + this.id)
      //   .then(response => (this.user = response.data))
      //   .catch(error => console.log(error))
};
</script>
<style media="screen">

</style>
