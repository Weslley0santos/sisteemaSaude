import type { RouteRecordRaw } from 'vue-router';

import PaginaPrincipal from 'layouts/PaginaPrincipal.vue';

import DashboardAtendimento from 'src/pages/DashboardAtendimento.vue';
import TriagemAtendimentos from 'src/pages/triagemAtendimentos.vue';
import ConsultasAtendimento from 'src/pages/consultasAtendimento.vue';
import finalizadosAtendimento from 'src/pages/finalizadosAtendimento.vue';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: PaginaPrincipal,

    children: [
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
        component: finalizadosAtendimento,
        meta: {
          showBotaoAdd: true,
        },
      },
    ],
  },
];

export default routes;
