
const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('src/pages/login/login')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
