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
    formTitle: function() {
      if (this.isAddMode) {
        return 'あたらしいなかま';
      }
      return 'ステータス';
    },
    buttonText: function() {
      if (this.isAddMode) {
        return 'なかまにする';
      }
      return 'くびにする';
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
    changeAddMode() {
      this.clear();
      this.friend.id = -1;
    },
    async submit() {
      if (!this.isAddMode) {
        this.delete();
      } else {
        const newFriend = await createNewFriend(
          this.friends.length,
          this.friend
        );
        this.friends.push(newFriend);
      }
      this.changeAddMode();
    },
    delete() {
      this.friends = this.friends.filter((x) => x.id !== this.friend.id);
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
