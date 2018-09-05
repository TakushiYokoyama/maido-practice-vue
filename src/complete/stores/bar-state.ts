import IFriend from '../../models/firend';
import { createEmptyFriend } from '../../services/friend-service';

export interface IBarState {
  friend: IFriend;
  friends: IFriend[];
}

export const barState: IBarState = {
  friend: createEmptyFriend(),
  friends: [],
};
