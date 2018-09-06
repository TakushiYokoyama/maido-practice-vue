import { mapState, mapGetters, mapActions } from '../../../common/store-helper';
import { IBarState, IBarGetters, IBarActions } from './../../stores/bar-store';
import Vue from 'vue';

export default Vue.extend({
  name: 'completeFriends',
  computed: {
    ...mapState<IBarState>('completeBarStore', 'friend', 'friends'),
    ...mapGetters<IBarGetters>(
      'completeBarStore',
      'isAddMode',
      'isValid',
      'sortedFriends'
    ),
  },
  methods: {
    getSexName: (sex: string) => {
      if (sex === 'male') {
        return 'おとこ';
      }
      return 'おんな';
    },
    ...mapActions<IBarActions>(
      'completeBarStore',
      'clear',
      'add',
      'remove',
      'selectRow'
    ),
  },
  components: {},
});
