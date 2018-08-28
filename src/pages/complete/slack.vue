<template>
    <div class="root">
        <section class="side">
            <h3>Channels</h3>
            <ul class="channels">
                <li><router-link to="/complete-slack/general">#general</router-link></li>
                <li><router-link to="/complete-slack/random">#random</router-link></li>
            </ul>
        </section>
        <section class="main">
            <router-view></router-view>
        </section>
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
        display: flex;

        a {
            color: black;
            text-decoration: none;
        }
        

        .side {
            h3 {
                font-size: 1.1em;
            }

            .channels {
                padding-left: 0;
                list-style-type: none;
            }
        }
    }
</style>