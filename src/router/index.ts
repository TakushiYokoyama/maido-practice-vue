import homeIndex from '@/pages/home/index.vue';
import testIndex from '@/pages/test/index.vue';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homeIndex',
      component: homeIndex,
    },
    {
      path: '/test',
      name: 'testIndex',
      component: testIndex,
    },
  ],
});
