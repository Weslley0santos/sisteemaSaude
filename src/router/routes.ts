import type { RouteRecordRaw } from 'vue-router';

import PaginaPrincipal from 'layouts/PaginaPrincipal.vue';

import DashboardAtendimento from 'src/pages/DashboardAtendimento.vue';
import TriagemAtendimentos from 'src/pages/triagemAtendimentos.vue';
import ConsultasAtendimento from 'src/pages/consultasAtendimento.vue';
import FinalizadosAtendimento from 'src/pages/finalizadosAtendimento.vue';

import LoginPage from 'src/pages/LoginPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: LoginPage,
  },

  {
    path: '/',
    component: PaginaPrincipal,
    meta: { requiresAuth: true },

    children: [
      {
        path: '',
        redirect: '/dashboard',
      },

      {
        path: 'dashboard',
        component: DashboardAtendimento,
      },

      {
        path: 'triagem',
        component: TriagemAtendimentos,
      },

      {
        path: 'consulta',
        component: ConsultasAtendimento,
      },

      {
        path: 'finalizados',
        component: FinalizadosAtendimento,
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    redirect: '/login',
  },
];

export default routes;
