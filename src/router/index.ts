import completeIndex from '@/pages/complete/index.vue';
import homeIndex from '@/pages/home/index.vue';
import practiceIndex from '@/pages/practice/index.vue';
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
      path: '/practice',
      name: 'practiceIndex',
      component: practiceIndex,
    },
    {
      path: '/complete',
      name: 'completeIndex',
      component: completeIndex,
    },
  ],
});
