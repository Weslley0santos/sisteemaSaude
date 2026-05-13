import { ref } from 'vue';
import type { Atendimento } from 'src/types/atendimento';

export function useAtendimentoModal() {
  const modalAberto = ref(false);

  const atendimentoSelecionado = ref<Atendimento | null>(null);

  const editando = ref(false);

  const abrirModal = (atendimento: Atendimento) => {
    atendimentoSelecionado.value = atendimento;

    modalAberto.value = true;
  };

  const ativarEditar = () => {
    editando.value = true;
  };

  const fecharModal = () => {
    modalAberto.value = false;
    atendimentoSelecionado.value = null;

    editando.value = false;
  };

  return {
    modalAberto,
    atendimentoSelecionado,
    editando,

    abrirModal,
    fecharModal,
    ativarEditar,
  };
}
