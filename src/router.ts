import homeIndex from '@/index.vue';
import completeIndex from '@/complete/pages/index.vue';
import practiceIndex from '@/practice/pages/index.vue';
import completeSlack from '@/complete/pages/slack.vue';
import completeSlackChannel from '@/components/completeSlackChannel.vue';
import completeBar from '@/complete/pages/bar/index.vue';
import practiceBar from '@/practice/pages/bar/index.vue';
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
    {
      path: '/complete/slack',
      name: 'completeSlack',
      component: completeSlack,
      children: [
        {
          path: 'channels/:channelName',
          component: completeSlackChannel,
          props: true,
        },
      ],
    },
    {
      path: '/complete/bar',
      name: 'completeBar',
      component: completeBar,
    },
    {
      path: '/practice/bar',
      name: 'practiceBar',
      component: practiceBar,
    },
  ],
});
