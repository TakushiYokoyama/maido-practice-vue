<template>
  <h4>channel: {{ channelName }}</h4>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name:'channel',
  props:['channelName'],
  data(){
    return{}
  }
})
</script>

<style lang="less" scoped>
h4{
    margin-left: 50px;
}
</style>
