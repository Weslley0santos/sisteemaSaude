import type { RouteRecordRaw } from 'vue-router';

import PaginaPrincipal from 'layouts/PaginaPrincipal.vue';

import DashboardAtendimento from 'src/pages/DashboardAtendimento.vue';
import triagemAtendimentos from 'src/pages/triagemAtendimentos.vue';
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

    children: [
      {
        path: '',
        redirect: '/dashboard',
      },

      {
        path: 'dashboard',
        component: DashboardAtendimento,
        meta: {
          showBotaoAdd: true,
        },
      },

      {
        path: 'triagem',
        component: triagemAtendimentos,
        meta: {
          showBotaoAdd: true,
        },
      },

      {
        path: 'consulta',
        component: ConsultasAtendimento,
        meta: {
          showBotaoAdd: true,
        },
      },

      {
        path: 'finalizados',
        component: FinalizadosAtendimento,
        meta: {
          showBotaoAdd: true,
        },
      },
    ],
  },
];

export default routes;
