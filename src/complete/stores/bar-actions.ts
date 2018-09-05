import { DefineActions } from 'vuex-type-helper';
import IFriend from '../../models/firend';
import { IBarState } from './bar-state';
import { IBarMutations } from './bar-mutations';
import {
  createEmptyFriend,
  createNewFriend,
} from '../../services/friend-service';

export interface IBarActions {
  clear: void;
  add: { friend: IFriend; friends: IFriend[] };
  remove: { id: number };
  selectRow: { friend: IFriend };
}

export const barActions: DefineActions<
  IBarActions,
  IBarState,
  IBarMutations
> = {
  clear: ({ commit }) => {
    commit('setFriend', createEmptyFriend());
  },
  add: ({ commit }, { friend, friends }) => {
    const newFriend = createNewFriend(friends.length, friend);
    commit('add', newFriend);
    commit('setFriend', createEmptyFriend());
  },
  remove: ({ commit }, { id }) => {
    commit('remove', id);
  },
  selectRow: ({ commit }, { friend }) => {
    commit('setFriend', friend);
  },
};
