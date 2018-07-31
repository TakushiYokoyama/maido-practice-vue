<template>
  <div class="item">
    おめでとう！{{name}}さん。
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name:'child',
  props:['name'],
  data(){
    return{}
  }
})
</script>

<style lang="less" scoped>
</style>
