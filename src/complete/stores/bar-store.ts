import { barState } from './bar-state';
import { barActions } from './bar-actions';
import { barMutations } from './bar-mutations';
import { barGetters } from './bar-getter';

export const completeBarStore = {
  namespaced: true,
  barState,
  barMutations,
  barActions,
  barGetters,
};
