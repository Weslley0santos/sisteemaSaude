import type { RouteRecordRaw } from 'vue-router';

import PaginaPrincipal from 'layouts/PaginaPrincipal.vue';

import TelaAtendimento from 'pages/TelaAtendimento.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: PaginaPrincipal,

    children: [
      {
        path: '',
        component: TelaAtendimento,
      },
    ],
  },
];

export default routes;
