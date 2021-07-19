import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Enter',
    meta: {auth: true},
    component: () => import( '../views/Enter.vue')
  },
  {
    path: '/dashboard',
   name:'Dashboard',
    meta: {auth: true},
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        name: 'Questions',
        path: '/dashboard/questions',
        component: () => import('../views/Questions.vue'),
      },
      {
        name: 'Users',
        path: '/dashboard/users',
        component: () => import('../views/Users.vue'),
      },
      {
        name: 'UsersDetail',
        path: '/dashboard/users-detail/:id',
        component: () => import('../views/UsersDetail.vue'),
      },

    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/test',
    name: 'Test',
    meta: {auth: true},
    component: () => import( '../views/Test.vue')
  },
  {
    path: '/result',
    name: 'Result',
    meta: {auth: true},
    component: () => import( '../views/Result.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from, next) =>{
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

if(requireAuth && !currentUser){
  next('/login')
}else{
  next()
}

})



export default router
