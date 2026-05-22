import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token'),
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    init() {
      this.token = localStorage.getItem('token');
    },

    login() {
      const fakeToken = 'token-' + Date.now();

      this.token = fakeToken;
      localStorage.setItem('token', fakeToken);
    },

    logout() {
      this.token = null;
      localStorage.removeItem('token');
    },
  },
});
