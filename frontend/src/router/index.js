import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import PictureDisplay from '@/components/PictureDisplay'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: PictureDisplay
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    }
  ]
})
