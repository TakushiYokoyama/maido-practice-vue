import { DefineGetters } from 'vuex-type-helper';
import { IBarState } from './bar-state';
import IFriend from '../../models/firend';

export interface IBarGetters {
  isAddMode: boolean;
  isValid: boolean;
  formTitle: string;
  buttonText: string;
  sortedFriends: IFriend[];
}

export const isAddMode = (state: IBarState) => state.friend.id < 0;
export const barGetters: DefineGetters<IBarGetters, IBarState> = {
  isAddMode,
  isValid: (state: IBarState) =>
    Boolean(state.friend.name && state.friend.sex && state.friend.job),
  formTitle: () => (isAddMode ? 'あたらしいなかま' : 'ステータス'),
  buttonText: () => (isAddMode ? 'なかまにする' : 'くびにする'),
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
