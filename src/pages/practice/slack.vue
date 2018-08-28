<template>
    <div class="root">

        <ul class="channels">
            <li>general</li>
            <li>random</li>
        </ul>
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
    .root {
        .channels {
            list-style-type: none;
        }
    }
</script>