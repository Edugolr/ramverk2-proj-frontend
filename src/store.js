import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      isLoggedIn: false,
      email: false
  },
  getters: {
      loginStatus: state => {
      return state.isLoggedIn
  },
      email: state => {
      return state.email
    }
  },
  mutations: {
      changeState(state, newState) {
          state.isLoggedIn = newState
          console.log(state.isLoggedIn)
      },
      changeEmail(state, newState) {
          state.email = newState
          console.log(state.email);
      }
  },
  actions: {},
  plugins: [new VuexPersistence().plugin]
});
