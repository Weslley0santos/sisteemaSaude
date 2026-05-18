import type { RouteRecordRaw } from 'vue-router';

import PaginaPrincipal from 'layouts/PaginaPrincipal.vue';

import DashboardAtendimento from 'src/pages/DashboardAtendimento.vue';
import TriagemAtendimentos from 'src/pages/triagemAtendimentos.vue';
import ConsultasAtendimento from 'src/pages/consultasAtendimento.vue';
import FinalizadosAtendimento from 'src/pages/finalizadosAtendimento.vue';

import LoginPage from 'src/pages/LoginPage.vue';

const routes: RouteRecordRaw[] = [
  // LOGIN
  {
    path: '/login',
    component: LoginPage,
  },

  // SISTEMA
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
        component: TriagemAtendimentos,
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