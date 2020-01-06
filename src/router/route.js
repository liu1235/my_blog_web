import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './index'

Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

let routerApi = ['/userInfo'];

router.beforeEach((to, from, next) => {
  let user = JSON.parse(sessionStorage.getItem('userInfo'));
  if (to.path === '/login') {
    sessionStorage.removeItem('userInfo');
  }
  if (!user && to.path !== '/login') {
    if(routerApi.indexOf(to.path) > -1) {
      next({ path: '/login' });
    } else {
      next();
    }
  } else {
    alert(to.path)
      if (to.path) {
        next();
      } else {
        next({ path: '/404' });
      }
  }
});

export default router;
