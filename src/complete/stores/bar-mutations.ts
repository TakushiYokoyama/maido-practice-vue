import { DefineMutations } from 'vuex-type-helper';
import { IBarState } from './bar-state';
import IFriend from '../../models/firend';

export interface IBarMutations {
  setFriend: IFriend;
  add: IFriend;
  remove: number;
}

export const barMutations: DefineMutations<IBarMutations, IBarState> = {
  setFriend: (state, friend) => (state.friend = friend),
  add: (state, friend) => state.friends.push(friend),
  remove: (state, id) =>
    (state.friends = state.friends.filter((x) => x.id !== id)),
};
