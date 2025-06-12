import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TicketsView from '../views/TicketsView.vue'
import UsuarioFormulario from '@/components/usuarios/UsuarioFormulario.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/usuarios',
    name: 'usuarios',
    component: () => import('../views/UsuarioView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/registros',
    name: 'Registros',
    component: () => import('../views/RegistrosView.vue')
  },
  {
    path: '/ticket',
    name: 'Ticket',
    component: () => import('../views/TicketView.vue')
  },
  {
    path: '/tickets',
    name: 'Tickets',
    component: TicketsView
  },
  {
    path: '/formulario',
    name: 'Formulario',
    component: UsuarioFormulario
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
