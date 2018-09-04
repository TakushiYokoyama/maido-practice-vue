<template>
  <div class="root">
    <div class="row">
      <div class="item">
        <label>twoWayPractice</label>
      </div>
      <div class="item">
        <input type="text">
      </div>
      <div class="item">
        <p>twoWayPractice = "<span class="result"></span>"</p>
      </div>
    </div>
    <div class="row">
      <div class="item">
        <label>ifPractice</label>
      </div>
      <div class="item">
        <input type="checkbox">
      </div>
      <div class="item">
        <p>show</p>
      </div>
    </div>
    <div class="row">
      <div class="item">
        <label>forPractice</label>
      </div>
      <div class="item">
        <button>-</button>
        <button>+</button>
      </div>
      <div class="item">
        <p>
          <span class="result">★</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data(){
    return{
    }
  },
  methods:{
  },
  components:{
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
