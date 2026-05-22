import type { Router } from 'vue-router';

export function setupAuthGuard(router: Router) {
  router.beforeEach((to) => {
    const token = localStorage.getItem('token');

    if (to.path !== '/login' && !token) {
      return '/login';
    }

    if (to.path === '/login' && token) {
      return '/dashboard';
    }
  });
}
