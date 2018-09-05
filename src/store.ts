import Vue from 'vue';
import Vuex from 'vuex';
import { completeBarStore } from './complete/stores/bar-store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    completeBarStore,
  },
});
