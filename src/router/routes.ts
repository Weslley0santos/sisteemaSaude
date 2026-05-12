import type { RouteRecordRaw } from 'vue-router';

import PaginaPrincipal from 'layouts/PaginaPrincipal.vue';

import DashboardAtendimento from 'src/pages/DashboardAtendimento.vue';
import TriagemAtendimentos from 'src/pages/triagemAtendimentos.vue';
import ConsultasAtendimento from 'src/pages/consultasAtendimento.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: PaginaPrincipal,

    children: [
      {
        path: '',
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
    ],
  },
];

export default routes;
