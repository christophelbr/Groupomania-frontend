import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Wall from '../views/Wall.vue'
import Profile from '../views/Profile.vue'
import Goodbye from '../views/Goodbye'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/wall',
    name: 'Wall',
    component: Wall
  },
  {
    path: '/wall/post/:postId',
    name: 'Comments',
    component: Wall
  },
  {
    path: '/goodbye',
    name: 'Goodbye',
    component: Goodbye
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
