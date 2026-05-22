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
        meta: {
          requiresAuth: true,
          showBotaoAdd: true,
        },
      },

      {
        path: 'triagem',
        component: TriagemAtendimentos,
        meta: {
          requiresAuth: true,
          showBotaoAdd: true,
        },
      },

      {
        path: 'consulta',
        component: ConsultasAtendimento,
        meta: {
          requiresAuth: true,
          showBotaoAdd: true,
        },
      },

      {
        path: 'finalizados',
        component: FinalizadosAtendimento,
        meta: {
          requiresAuth: true,
          showBotaoAdd: true,
        },
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    redirect: '/login',
  },
];

export default routes;
