import Vue from 'vue';
import Vuex, { ModuleTree } from 'vuex';
import { completeBarStore } from './complete/stores/bar-store';

Vue.use(Vuex);

export interface IStore {
  completeBarStore: any;
}
export default new Vuex.Store({
  modules: { completeBarStore } as ModuleTree<{}> & IStore,
});
