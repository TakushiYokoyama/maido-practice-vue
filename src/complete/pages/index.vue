<template>
  <div class="root">
    <div class="row">
      <div class="item">
        <label>twoWayPractice</label>
      </div>
      <div class="item">
        <input type="text" v-model="twoWayPractice">
      </div>
      <div class="item">
        <p>twoWayPractice = "<span class="result">{{twoWayPractice}}</span>"</p>
      </div>
    </div>
    <div class="row">
      <div class="item">
        <label>ifPractice</label>
      </div>
      <div class="item">
        <input type="checkbox" v-model="ifPractice">
      </div>
      <div class="item">
        <p v-if="ifPractice">show</p>
      </div>
    </div>
    <div class="row">
      <div class="item">
        <label>forPractice</label>
      </div>
      <div class="item">
        <button v-on:click="onMinusClick" v-bind:disabled="!counter">-</button>
        <button v-on:click="onPlusClick">+</button>
      </div>
      <div class="item">
        <p>
          <span v-for="i in counter" :key="i" class="result">★</span>
        </p>
      </div>
    </div>
    <child name="xxx"></child>
  </div>
</template>

<script lang="ts">
import child from '@/components/child.vue';
import Vue from 'vue'
export default Vue.extend({
  name:'completeIndex',
  data(){
    return{
      twoWayPractice:'初期値',
      ifPractice:false,
      counter:0,
    }
  },
  methods:{
    onPlusClick(){
      this.counter+=1;
    },
    onMinusClick(){
      if(this.counter>0){
        this.counter-=1;
      }
    },
  },
  components:{
    child:child,
  }
})
</script>

<style lang="less" scoped>
div.root {
  padding: 0 100px;
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    .item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 33%;
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
}
</style>
