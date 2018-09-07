# component

## はじめに

- repository を複製してください。
  - https://github.com/TakushiYokoyama/maido-practice-vue.git
  - git@github.com:TakushiYokoyama/maido-practice-vue.git

## 今日のゴール

Component の作り方、使い方を理解する

## 説明

#### Component とは

Web パーツみたいなもの。vue.js では Component を組み合わせて Web ページを作る。  
html と css でデザインしたものに、js の ViewModel(値や振る舞いを記述)を組み合わせて作る。  
この時 vue.js によって拡張されたシンタックスを使うことでいろいろな表現ができる。

#### ソースについて

| ソース                        | ページ                           | 説明                     |
| ----------------------------- | -------------------------------- | ------------------------ |
| /src/pages/practice/index.vue | http://localhost:8080/#/practice | これから編集するファイル |
| /src/pages/complete/index.vue | http://localhost:8080/#/complete | 完成系                   |

## Hands On

#### 値の表示

viewModel に設定した値を表示する

- hint
  - data メソッドで返却した変数は、html 内で`{{変数名}}`でアクセスできる

```html
<div>{{hoge}}</div>
```

```typescript
data(){
  return{
    hoge:'hoge',
  }
}
```

#### 双方向バインディング

インプットの文字と結果の文字を同期する

- hint
  - 双方向バインディングには `v-model` を使う

```html
<input v-model="hoge">
```

#### 表示の切り替え

チェックボックスの状態で表示/非表示を切り替える

- hint
  - `v-if` を使えば表示非表示を切り替えられる

```html
<p v-if="hoge">show</p>
```

#### イベント

ボタンを押してカウンターの数値を上下させる。

- hint
  - click イベントは `v-on:click` で設定できる。メソッドは、`methods` に記述できる

```html
<button v-on:click="writeLog">write log</button>
```

```typescript
methods:{
  writeLog(){
    console.write(this.hoge);
  },
},
```

#### 非活性

カウンターの値が 0 以下の場合`-`ボタンを押せないようにする

- hint
  - `v-bind:disabled` で属性値とバインドできる

```html
<button v-bind:disabled="hoge">write log</button>
```

#### 繰り返し

counter の数分 ★ を表示する

- hint
  - `v-for="i in counter"` で繰り返しができる
    - `:key="i"` をつけないと TSLint でエラー

#### 子コンポーネントの呼び出し

プロパティ値を指定して子コンポーネントに値を引き渡す

- hint
  - プロパティ値は属性で渡すことができる
  - 予め使用する Component を定義する必要がある

```html
<childItem name="xxx"></childItem>
```

```typescript
import child from '@/components/child.vue';
components:{
  childItem:child,
}
```
