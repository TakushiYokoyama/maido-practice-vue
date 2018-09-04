import Vue from 'vue';
import IFriend from '../../../models/firend';

const malePersonalities = [
  'ごうけつ',
  'ちからじまん',
  'らんぼうもの',
  'おおぐらい',
  'ねっけつかん',
  'タフガイ',
  'てつじん',
  'がんこもの',
  'くろうにん',
  'がんばりや',
  'まけずぎらい',
  'いのちしらず',
  'むっつりスケベ',
  'でんこうせっか',
  'すばしっこい',
  'おっちょこちょい',
  'ぬけめがない',
  'うっかりもの',
  'いっぴきおおかみ',
  'わがまま',
  'みえっぱり',
  'きれもの',
  'ずのうめいせき',
  'あたまでっかち',
  'ロマンチスト',
  'おせっかい',
  'さびしがりや',
  'いくじなし',
  'あまえんぼう',
  'おちょうしもの',
  'なきむし',
  'なまけもの',
  'ひねくれもの',
  'ひっこみじあん',
  'しょうじきもの',
  'せけんしらず',
  'のんきもの',
  'やさしいひと',
  'しあわせもの',
  'ラッキーマン',
  'ふつう',
];
const femalePersonalities = [
  'ごうけつ',
  'ちからじまん',
  'らんぼうもの',
  'おおぐらい',
  'おとこまさり',
  'おてんば',
  'ねっけつかん',
  'タフガイ',
  'てつじん',
  'がんこもの',
  'くろうにん',
  'がんばりや',
  'まけずぎらい',
  'いのちしらず',
  'でんこうせっか',
  'すばしっこい',
  'おっちょこちょい',
  'ぬけめがない',
  'うっかりもの',
  'いっぴきおおかみ',
  'わがまま',
  'みえっぱり',
  'きれもの',
  'ずのうめいせき',
  'あたまでっかち',
  'ロマンチスト',
  'おせっかい',
  'さびしがりや',
  'いくじなし',
  'あまえんぼう',
  'おちょうしもの',
  'なきむし',
  'なまけもの',
  'ひねくれもの',
  'ひっこみじあん',
  'しょうじきもの',
  'せけんしらず',
  'のんきもの',
  'やさしいひと',
  'しあわせもの',
  'おじょうさま',
  'セクシーギャル',
  'ふつう',
];
const createFriend = () =>
  ({
    id: -1,
    name: '',
    sex: '',
    job: '',
    atack: 0,
    agility: 0,
    physical: 0,
    intelligence: 0,
    luck: 0,
    maxHp: 0,
    maxMp: 0,
    personality: '',
  } as IFriend);
export default Vue.extend({
  name: 'completeFriends',
  data() {
    return {
      friend: createFriend(),
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
    getRandomParameter(min: number, max: number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    },
    getRandomPersonality(sex: string) {
      const personalities =
        sex === 'male' ? malePersonalities : femalePersonalities;
      const max = personalities.length - 1;
      const i = this.getRandomParameter(0, max);
      return personalities[i];
    },
    submit() {
      if (!this.isAddMode) {
        this.delete();
      } else {
        const newFriend: IFriend = Object.assign({}, this.friend, {
          id: this.friends.length,
          atack: this.getRandomParameter(1, 20),
          agility: this.getRandomParameter(1, 20),
          physical: this.getRandomParameter(1, 20),
          intelligence: this.getRandomParameter(2, 20),
          luck: this.getRandomParameter(2, 20),
          maxHp: this.getRandomParameter(10, 30),
          maxMp: this.getRandomParameter(0, 30),
          personality: this.getRandomPersonality(this.friend.sex),
        });
        this.friends.push(newFriend);
      }
      this.changeAddMode();
    },
    delete() {
      this.friends = this.friends.filter((x) => x.id !== this.friend.id);
    },
    clear() {
      this.friend = createFriend();
    },
    selectRow(friend: IFriend) {
      this.friend = Object.assign({}, friend);
    },
  },
  components: {},
});
