// src/boot/vue-query.ts
import { boot } from 'quasar/wrappers';
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';

const queryClient = new QueryClient();

export default boot(({ app }) => {
  app.use(VueQueryPlugin, {
    queryClient,
  });
});
