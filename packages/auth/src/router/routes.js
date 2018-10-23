
const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('src/pages/login/login')
  },
  { // Always leave this as last one
    path: '*',
    name: 'not-found',
    component: () => import('src/pages/404/404')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/404/404.vue')
  })
}

export default routes
