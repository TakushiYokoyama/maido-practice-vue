import { IBarState } from './bar-store-module';
import {
  DefineActions,
  DefineGetters,
  DefineMutations,
} from 'vuex-type-helper';
import IFriend from '../../models/firend';
import {
  createEmptyFriend,
  createNewFriend,
} from '../../services/friend-service';
import { Module } from 'vuex';
import { IStore } from '../../store';
import { getByLocalstorage } from '../../common/localstorage-helper';

export interface IBarState {
  friend: IFriend;
  friends: IFriend[];
}
const barState = getByLocalstorage('completeBarStore', () => ({
  friend: createEmptyFriend(),
  friends: [],
}));

export interface IBarGetters {
  isAddMode: boolean;
  isValid: boolean;
  sortedFriends: IFriend[];
}

const barGetters: DefineGetters<IBarGetters, IBarState> = {
  isAddMode: (state: IBarState) => state.friend.id < 0,
  isValid: (state: IBarState) =>
    Boolean(state.friend.name && state.friend.sex && state.friend.job),
  sortedFriends: (state: IBarState) => {
    return state.friends.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });
  },
};

export interface IBarMutations {
  setFriend: IFriend;
  add: IFriend;
  remove: number;
}

const barMutations: DefineMutations<IBarMutations, IBarState> = {
  setFriend: (state, friend) => (state.friend = friend),
  add: (state, friend) => state.friends.push(friend),
  remove: (state, id) =>
    (state.friends = state.friends.filter((friend) => friend.id !== id)),
};
export interface IBarActions {
  clear: void;
  add: { friend: IFriend; friends: IFriend[] };
  remove: { id: number };
  selectRow: { friend: IFriend };
}

const barActions: DefineActions<IBarActions, IBarState, IBarMutations> = {
  clear: ({ commit }) => {
    commit('setFriend', createEmptyFriend());
  },
  add: async ({ commit }, { friend, friends }) => {
    const newFriend = await createNewFriend(friends.length, friend);
    commit('add', newFriend);
    commit('setFriend', createEmptyFriend());
  },
  remove: ({ commit }, { id }) => {
    commit('remove', id);
    commit('setFriend', createEmptyFriend());
  },
  selectRow: ({ commit }, { friend }) => {
    commit('setFriend', friend);
  },
};

export const completeBarStore: Module<IBarState, IStore> = {
  namespaced: true,
  state: barState,
  mutations: barMutations,
  actions: barActions,
  getters: barGetters,
};
