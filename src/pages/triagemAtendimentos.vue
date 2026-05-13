<template>
  <p>triagem</p>
  <cardAtendimento
    v-for="item in store.triagem"
    :key="item.senha"
    :atendimento="item"
    tipo="triagem"
    @enviar-consulta="enviarParaConsulta"
    @editar="abrirModal"
  />
  <modalAtendimento :model-value="modalAberto" :atendimento="atendimentoSelecionado" />
</template>

<script setup lang="ts">
import cardAtendimento from 'src/components/Atendimento/cardAtendimento.vue';
import modalAtendimento from '../components/Atendimento/modalAtendimento.vue';
import { useAtendimentoStore } from 'src/stores/atendimentoStore';
import type { Atendimento } from 'src/types/atendimento';
import { useAtendimentoModal } from 'src/composable/useAtendimentoModal';

const store = useAtendimentoStore();

const enviarParaConsulta = (atendimento: Atendimento) => {
  store.avancarParaConsulta(atendimento.senha);
};

const {
  modalAberto,
  atendimentoSelecionado,

  abrirModal,
} = useAtendimentoModal();
</script>
