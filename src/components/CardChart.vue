<template lang="html">
        <div id="container" style="width:100%; height:400px;"></div>
</template>

<script>
var Highcharts = require('highcharts/highstock');

// Load Highmaps as a module
require('highcharts/modules/map')(Highcharts);
var moment = require('moment');
export default {
    name: 'cardchart',
    props: {
        chart:
    }
    created () {
        let self = this;
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
    }
}
</script>

<style lang="css" scoped>
</style>

<script type="text/javascript">

</script>
