import Vue from 'vue';
import IFriend from '../../../models/firend';
import {
  createEmptyFriend,
  createNewFriend,
} from '../../../services/friend-service';

export default Vue.extend({
  name: 'completeFriends',
  data() {
    return {
      friend: createEmptyFriend(),
      friends: [] as IFriend[],
    };
  },
  computed: {
    isAddMode: function() {
      return this.friend.id < 0;
    },
    isValid: function() {
      return this.friend.name && this.friend.sex && this.friend.job;
    },
    sortedFriends: function() {
      return this.friends.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      });
    },
  },
  methods: {
    getSexName(sex: string) {
      if (sex === 'male') {
        return 'おとこ';
      }
      return 'おんな';
    },
    async add() {
      const newFriend = await createNewFriend(this.friends.length, this.friend);
      this.friends.push(newFriend);
      this.clear();
    },
    remove() {
      this.friends = this.friends.filter((x) => x.id !== this.friend.id);
      this.clear();
    },
    clear() {
      this.friend = createEmptyFriend();
    },
    selectRow(friend: IFriend) {
      this.friend = Object.assign({}, friend);
    },
  },
  components: {},
});
