# store

## store 管理とは

ここでいう store とは、アプリケーション内部で扱うステート(巨大な json みたいなイメージ)を扱うオブジェクトのことを指す。
つまり store 管理とはそのアプリケーションで扱うデータの管理についてを指す。
FRP である Flux アーキテクチャで実装するのがはやり。

#### FRP? Flux?

FRP は Functional reactive programming のこと。
Flux は facebook が提唱する FRP でデータストアを扱うためのアーキテクチャ

- facebook より  
  ![Flux データフロー](https://github.com/facebook/flux/raw/master/examples/flux-concepts/flux-simple-f8-diagram-with-client-action-1300w.png)

#### メリット

- 各 Component 間でのデータ共有がしやすい  
  Component 間の state のバケツリレーを減らせる
- Component をステートレスに実装できる  
  責務分離できる
- データフローが一方通行になるので見通しが良くなる
- ロジックの種類によって定義する場所、命名が決まってくる
- プラグインによって AOP 的な実装ができる

#### ライブラリ

- Flux  
  facebook 公式。
- Redux  
  react で併用することが多い。一番利用されている
- MobX  
  Redux より簡易に実装できる
- Undux  
  MobX よりさらに簡易に実装できる
- Vuex  
  Vue 公式。今回使う。Redux よりは単純そう。

#### Vuex

- Veux より  
  ![データフロー](https://vuex.vuejs.org/vuex.png)

##### 用語集

- State  
  store が管理する Component の状態。
- Dispatch  
  Actions を実行するための命令。
- Actions  
  データ整形や API 問い合わせ、ビジネスロジックとかを記述する。
  key-value を指定して Mutations を実行する。
- Commit  
  key-value(type-payload)をもった Mutations の実行命令。
- Mutations  
  State を変更することができるオブジェクト。type=メソッド,payload=引数のイメージ。  
  非同期処理は実装できない。

## Hands On

#### ゴール

[practice-bar-component](../src/practice/pages/bar/index.vue)のステートを vuex で管理し、localstorage で永続化する

#### State,Getters,Actions,Mutations のインターフェースを作る

Component の data が State、computed が Getters、methods のステート変更を行うメソッドを Actions、methods の state 変更を行っているロジックを Mutations に切り出し、インターフェイスとして[bar-store-module](../src/practice/stores/bar-store-module.ts)実装する。

```ts
export interface IBarState {
  friend: IFriend;
  friends: IFriend[];
}

// 戻り値を型として定義
export interface IBarGetters {
  isAddMode: boolean;
  isValid: boolean;
  sortedFriends: IFriend[];
}

// 引数を型として定義
export interface IBarMutations {
  setFriend: IFriend;
  add: IFriend;
  remove: number;
}

// 引数を型として定義
export interface IBarActions {
  clear: {};
  // 引数は匿名インターフェースで実装すると変更しやすい
  add: { friend: IFriend; friends: IFriend[] };
  remove: { id: number };
  selectRow: { friend: IFriend };
}
```

#### State,Getters,Actions,Mutations の実体を作る

Getters,Actions,Mutations を Typescript の静的型チェック付きで定義するために、`vuex-type-helper`というライブラリを使う。  
DefineGetters,DefineMutations,DefineActions がそれに該当する。
[bar-store-module](../src/practice/stores/bar-store-module.ts)に実装する。

```ts
// Stateは初期値なので何も考えず実装できる
const barState: IBarState = {
  friend: createEmptyFriend(),
  friends: [],
};

// Gettersはcomputed(Stateを整形してhtmlに表示する)にあてはまる。stateを引数に持った関数オブジェクトとして実装する
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

// Stateを変更するコードを記述する
const barMutations: DefineMutations<IBarMutations, IBarState> = {
  setFriend: (state, friend) => (state.friend = friend),
  add: (state, friend) => state.friends.push(friend),
  remove: (state, id) =>
    (state.friends = state.friends.filter(friend => friend.id !== id)),
};

// vue-componentからdispatchをうけてMutationsにcommitする
const barActions: DefineActions<IBarActions, IBarState, IBarMutations> = {
  clear: ({ commit }) => {
    commit('setFriend', createEmptyFriend());
  },
  add: async ({ commit }, { friend, friends }) => {
    // 非同期処理もかける
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
```

#### Module を作る

State,Action,Mutations,Getters は本来 Store に対して単一だが、それだと実装するとき大きくなりすぎるので Module という単位で分割できる。
Module を使うとそれぞれのオブジェクトは namespace で区切られる。Component 定義する際は namespace を指定して store と連携できる。
[bar-store-module](../src/practice/stores/bar-store-module.ts)に実装する。

```ts
export const practiceBarStore: Module<IBarState, IStore> = {
  namespaced: true,
  state: barState,
  mutations: barMutations,
  actions: barActions,
  getters: barGetters,
};
```

#### store に Module を追加

[store](../src/store.ts)にモジュールを追加する。
※ vue と vuex の連結は[main](../src/main.ts)に記述済みとする。

#### component と store の連結

[practice-bar-component のスクリプト](../src/practice/pages/bar/bar.ts)を store と連結するように書きかえる
map メソッドは vuex のものでなく静的型チェック可能なカスタムメソッドを使う。

```ts
import { mapState, mapGetters, mapActions } from '../../../common/store-helper';
export default Vue.extend({
  name: 'completeFriends',
  // dataは不要になる
  computed: {
    // stateはcomputedとしてマップする
    ...mapState<IBarState>('completeBarStore', 'friend', 'friends'),
    // gettersはcomputedとしてマップする
    ...mapGetters<IBarGetters>(
      'completeBarStore',
      'isAddMode',
      'isValid',
      'sortedFriends',
    ),
  },
  methods: {
    // このロジックはストアに依存しないのでこのままおいとく
    getSexName: (sex: string) => {
      if (sex === 'male') {
        return 'おとこ';
      }
      return 'おんな';
    },
    // actionsはcomputedとしてマップする
    ...mapActions<IBarActions>(
      'completeBarStore',
      'clear',
      'add',
      'remove',
      'selectRow',
    ),
  },
  components: {},
});
```

##### Tips `...` (スプレッド演算子)について

```ts
// 以下は等価
const expected = {
  p1: 'p1',
  p2: 'p2',
  p3: 'p3',
};
const actual = {
  p1: 'p1',
  ...{
    p2: 'p2',
    p3: 'p3',
  },
};
```

#### html の修正

methods の引数が依然と変わったので修正する。

```ts
add({ friend, friends });
remove({ id: friend.id });
selectRow({ friend: f });
```

ここまででコンポーネントは使用可能になっている

#### State が変更するたびにローカルストレージに保存する

[store](../src/store.ts)にプラグインを実装する。

#### State の初期値をローカルストレージより取得する

[bar-store-module](../src/practice/stores/bar-store-module.ts)の State の初期化を以下に書き換える。

```ts
const barState = getByLocalstorage('practiceBarStore', () => ({
  friend: createEmptyFriend(),
  friends: [],
}));
```

これでデータを永続化できる。
