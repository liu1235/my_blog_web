import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './index'

Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

let routerApi = ['/userinfo'];

router.beforeEach((to, from, next) => {
  let user = JSON.parse(localStorage.getItem('userInfo'));

  if (routerApi.indexOf(to.path.toLowerCase()) > -1) {
    if (user === null) {
      next({path: '/login'});
    } else {
      next();
    }
  } else {
    if (to.path === '/login') {
      localStorage.removeItem('userInfo');
    }
    if (to.path) {
      next();
    } else {
      next({path: '/404'});
    }
  }

});

export default router;
