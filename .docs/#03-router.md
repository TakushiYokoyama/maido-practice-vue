# Front end hands on #3

## はじめに

- repository を pull

  - https://github.com/TakushiYokoyama/maido-practice-vue.git

## 今日のゴール

routing の仕組みを理解する

## 説明

### クライアントサイドルーティングとは

SPA は複数の画面の状態を 1 つのページで表現するが、単に状態を変化させるだけでは URL は変わらないので、ブックマーク、URL 共有や、ブラウザバックしたときに、意図した画面が表示できない問題が発生する。
これを解決するために、特定の URL に対応する画面の状態をクライアントサイドで用意するための仕組みがクライアントサイドルーティング。

- hash
  - #より下の部分だけ変更可能
  - サーバーにリクエストが行かないので SSR できない
- history api
  - origin より下の部分を変更可能
  - サーバーにリクエストを送ることができるので SSR 可能
  - ある状態の URL に直接アクセスしたとき、サーバー側で routing 設定をしていないと 404 になる。

### ソースについて

| ソース                        | ページ                                 | 説明                     |
| ----------------------------- | -------------------------------------- | ------------------------ |
| /src/pages/practice/slack.vue | http://localhost:8080/#/practice-slack | これから編集するファイル |
| /src/pages/complete/index.vue | http://localhost:8080/#/complete-slack | 完成系                   |

## Hands On

### ルーティング設定

`src/router/index.ts`で設定できる。

- Which: どの path にアクセスしたときに
  - VueRouter で設定
- What: 何の Component を表示するか
  - VueRouter で設定
- Where: どこに表示するか
  - `src/App.vue`に置いてある`<router-view/>`の場所にレンダリングされる

#### やること

```
http://localhost:8080/#/practice-slack
```

でアクセスしたときに、

```
src/pages/practice/slack.vue
```

が読み込まれるようにしたい。

### リンク設定

#### やること

```
http://localhost:8080/#/practice-slack
```

にある`#general`と`#random`をクリックすると、右側に channel 詳細の Component が表示されるようにしたい。

それぞれの Channel 詳細の URL は

```
http://localhost:8080/#/practice-slack/channels/general
http://localhost:8080/#/practice-slack/channels/random
```

channel 詳細の Component は

```
src/components/practiceSlackChannel.vue
```

#### ネストされたルート

ルート設定で`children`プロパティを置くとネストできる。`children`の中の`path`は、親の path を基準にした path を書く。

#### 動的なルート

ルートの path では`:`を使うことで動的な path にもマッチングできる。

```js
{
    path: '/practice/:id',
    name: 'practiceIndex',
    component: practiceIndex,
},
```

`children`の`path`でも使用可能。この動的なセグメントの値は、`this.$route.params`から参照できる。

#### リンクを貼る

```html
<router-link to="/foo">Foo</router-link>
```

でルーティングに対してリンクを貼ることができる。

### 動的なパスの値を Component で使う

#### やること

```
src/components/practiceSlackChannel.vue
```

の`channel: foo`の部分を動的に変更する。`this.$route.params`に入っている値を使う。

### Component を疎結合にする

#### やること

Component 内で`$route`を使うとテストがしにくいので、外からプロパティで渡せるようにする。ルート設定で`props: true`を追加すると`$route.params`が Component のプロパティとして設定される。

### チャンネル一覧部分をやや動的にする（復習）

#### やること

```
src/pages/practice/slack.vue
```

でべた書きしている`general`と`random`を配列のデータにして、`v-for`で表示する
