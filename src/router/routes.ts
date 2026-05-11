import type { RouteRecordRaw } from 'vue-router';

import PaginaPrincipal from 'layouts/PaginaPrincipal.vue';

import DashboardAtendimento from 'src/pages/DashboardAtendimento.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: PaginaPrincipal,

    children: [
      {
        path: '',
        component: DashboardAtendimento,
      },
    ],
  },
];

export default routes;
