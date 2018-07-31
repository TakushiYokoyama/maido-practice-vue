<template>
  <div>
    <div class="row">
      <label for="test">test</label>
      <input type="text" id="test" v-model="test">
      <p>test = "<span class="result">{{test}}</span>"</p>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data(){
    return{test:'初期値'}
  }
})
</script>
<style lang="less" scoped>
div {
  .row {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    label {
      padding-right: 10px;
      font-weight: bold;
    }
    p {
      padding-left: 10px;
      .result {
        color: red;
      }
    }
  }
}
</style>
