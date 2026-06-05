import { useQuasar } from 'quasar';

export function useTheme() {
  const $q = useQuasar();

  const carregarTema = () => {
    const darkMode = localStorage.getItem('darkMode');

    if (darkMode !== null) {
      $q.dark.set(JSON.parse(darkMode));
    }
  };

  const toggleDarkMode = () => {
    const novoValor = !$q.dark.isActive;

    $q.dark.set(novoValor);

    localStorage.setItem('darkMode', JSON.stringify(novoValor));
  };

  return {
    carregarTema,
    toggleDarkMode,
  };
}
