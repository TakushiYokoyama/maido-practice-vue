import Vue from 'vue';
import Vuex, { ModuleTree, Store } from 'vuex';
import { completeBarStore } from './complete/stores/bar-store';
import { createLocalstoragePlugin } from './common/localstorage-helper';

Vue.use(Vuex);

export interface IStore {
  completeBarStore: any;
}

export const store = new Store({
  modules: { completeBarStore } as ModuleTree<IStore>,
  plugins: [createLocalstoragePlugin<IStore>('completeBarStore')],
});
