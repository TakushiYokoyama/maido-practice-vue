#get-start

## 環境

- node.js
- vscode

## ゴール

- typescript で vue.js プロジェクトを作成する
- vscode でコード編集し、デバッグできる

## vue-cli の取得

```bash
npm i -g vue-cli
```

## project 作成～起動

```bash
# 任意のフォルダで
vue init webpack my-project
# ? Project name my-project
# ? Project description A Vue.js project
# ? Author
# ? Vue build standalone
# ? Install vue-router? Yes
# ? Use ESLint to lint your code? No
# ? Set up unit tests No
# ? Setup e2e tests with Nightwatch? No
# ? Should we run `npm install` for you after the project has been created? (recommended) npm
cd my-project
npm start
```

## vscode の設定

```bash
# 設定ファイルの追加
mkdir .vscode
mkdir .vscode/snippets
touch .vscode/extensions.json
touch .vscode/settings.json
touch .vscode/snippets/typescript.json
# vscode起動
code .
```

```json
// extensions.json
{
  "recommendations": [
    "eg2.tslint",
    "esbenp.prettier-vscode",
    "msjsdiag.debugger-for-chrome",
    "rebornix.project-snippets",
    "octref.vetur",
    "steoates.autoimport"
  ]
}
```

```json
// settings.json
{
  "prettier.semi": true,
  "prettier.singleQuote": true,
  "files.exclude": {
    "**/.git": true,
    "**/package-lock.json": true,
    "**/node_modules": true,
    "**/dist": true
  },
  "prettier.eslintIntegration": true,
  "editor.tabSize": 2,
  "prettier.trailingComma": "all",
  "tslint.autoFixOnSave": true,
  "tslint.alwaysShowRuleFailuresAsWarnings": true,
  "tslint.alwaysShowStatus": true
}
```

```bash
# vscode再起動
code .
```

## typescript 設定～ tslint の設定

```bash
# パッケージの取得
npm i -D typescript ts-loader@3 tslint
# typescript設定ファイルの追加
npx tsc --init
# tslint設定ファイルの追加
npx tslint --init
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "moduleResolution": "node",
    "noImplicitAny": true,
    "module": "esnext",
    "target": "es2017",
    "lib": ["es2017", "dom"],
    "sourceMap": true,
    "allowJs": true,
    "jsx": "react",
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "strictNullChecks": true,
    "suppressImplicitAnyIndexErrors": true,
    "noUnusedLocals": true
  },
  "include": ["./src/**/*.ts"]
}
```

```json
// tslint.json
{
  "defaultSeverity": "error",
  "extends": ["tslint:recommended"],
  "jsRules": {},
  "rules": {
    "quotemark": [true, "single"],
    "no-unused-expression": false,
    "object-literal-sort-keys": false
  },
  "rulesDirectory": []
}
```

#### Webpack の設定

```javascript
// /build/webpack.base.conf.js
// 14行目変更
    app: './src/main.ts',
// 25行目変更
    extensions: ['.js', '.vue', '.json', '.ts'],
// 38行目挿入
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        include: [resolve('src'), resolve('test')],
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
```

#### src の修正

- ファイル名の修正  
  .js → .ts に
- ファイルの追加

```ts
// /src/sfc.d.ts
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
```

- ts ファイルの修正  
  vue ファイルへの参照は拡張子をつける
- vue ファイルの修正  
  `<script>`→`<script lang="ts">`に修正

- 再実行

```bash
npm start
```

## vscode でデバッグ

#### 準備

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:8080",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

#### デバッグ

```bash
# まずアプリを起動する
npm start
# vscodeでデバッグする
```
