import { boot } from 'quasar/wrappers';
import axios from 'axios';
import { useAuthStore } from 'src/stores/authStore';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
});

/**
 * REQUEST INTERCEPTOR
 */
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(new Error(error?.message || 'Request error'));
  },
);

/**
 * RESPONSE INTERCEPTOR
 */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const authStore = useAuthStore();

    const status = error?.response?.status;

    if (status === 401) {
      authStore.logout?.();
      localStorage.removeItem('token');

      window.location.href = '/login';
    }

    const message = error?.response?.data?.message || 'Erro inesperado no servidor';

    console.error('[API ERROR]', {
      status,
      message,
      url: error?.config?.url,
    });

    return Promise.reject(new Error(message));
  },
);

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };
