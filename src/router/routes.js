const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('../pages/IndexPage.vue') },
      { path: 'setting', component: () => import('../pages/SettingPage.vue') }
    ]
  },
]

export default routes




