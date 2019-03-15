import '@babel/polyfill'
import Vue from "vue";
import './plugins/bootstrap-vue'
import './plugins/axios'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import lsWatcher from "vue-storage-watcher";
import Gravatar from 'vue-gravatar';

Vue.component('v-gravatar', Gravatar);
var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');

// Instantiate the socket client (`io`)
// (for now, you must explicitly pass in the socket.io client when using this library from Node.js)
var io = sailsIOClient(socketIOClient);
io.sails.url = 'https://backend.chai17.me';
Vue.prototype.$io = io;
Vue.prototype.$chart = '';
Vue.use(lsWatcher, { prefix: "" })
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
