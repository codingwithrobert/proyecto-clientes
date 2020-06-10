import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import AddClient from '../views/AddClient.vue';
import { isLoggedIn } from '../api/utils';
import { checkAdmin } from '../api/utils';

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      // Ruta Privada
      allowAnonymous: false
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      allowAnonymous: false
    }
  },
  {
    path: '/add-client',
    name: 'AddClient',

    component: () => import('../views/AddClient.vue'),
    meta: {
      allowAnonymous: false,
      allowNoAdmin: false
    }
  },
  {
    path: '/',
    name: 'Login',

    component: () => import('../views/Login.vue'),
    // Ruta Publica
    meta: {
      allowAnonymous: true
    }
  }
];

const router = new VueRouter({
  routes
});

// Comprobando cada pagina SI el user esta loggeado
router.beforeEach((to, from, next) => {
  // Si la ruta es privada el user no tiene token
  if (!to.meta.allowAnonymous && !isLoggedIn()) {
    next({
      path: '/',
      query: {
        redirect: to.fullPath
      }
    });
  }
  if (to.meta.allowNoAdmin === false && !checkAdmin()) {
    next({
      path: '/',
      query: {
        redirect: to.fullPath
      }
    });
  } else {
    next();
  }
});
export default router;
