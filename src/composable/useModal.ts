import { ref } from 'vue';
import type { Atendimento } from 'src/types/atendimento';

type ModalMode = 'create' | 'view' | 'edit';

const aberto = ref(false);

const modo = ref<ModalMode>('view');

const atendimentoAtual = ref<Atendimento | null>(null);

export function useModal() {
  const abrirCreate = () => {
    // cria uma função que abre o formulario pra cadastrar um novo atendimento
    aberto.value = true; // o modal assume valor aberto
    modo.value = 'create'; // modal no modo create pra receber os dados
    atendimentoAtual.value = null; // nenhum atendimento atual, pois ta criando um
  };

  const abrirView = (atendimento: Atendimento) => {
    // abre a visualização do modal
    aberto.value = true; //modal aberto
    modo.value = 'view'; // modo de visuzalização
    atendimentoAtual.value = atendimento; // mostra o atendimento que foi clicado
  };
  const abrirEdit = (atendimento: Atendimento) => {
    // abre a edição
    aberto.value = true; // modal aberto
    modo.value = 'edit'; // modo de editar
    atendimentoAtual.value = atendimento; // atendimento selecionado
  };
  const fechar = () => {
    // fecha o modal
    aberto.value = false; // modal fechado
  };

  return {
    aberto,
    modo,
    atendimentoAtual,

    abrirCreate,
    abrirView,
    abrirEdit,
    fechar,
  };
}
