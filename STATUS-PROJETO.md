# Status do Projeto - Sistema Saude

Atualizado em: 11/06/2026

## Visao geral da arquitetura

O projeto e uma aplicacao frontend SPA feita com Quasar 2, Vue 3, TypeScript, Vue Router, Pinia, Vue Query, Axios, Tailwind CSS e Vue I18n.

A arquitetura esta organizada em camadas simples:

- `src/pages`: telas principais da aplicacao.
- `src/layouts`: layout autenticado principal.
- `src/components`: componentes reutilizaveis de dashboard, atendimento, header e menu lateral.
- `src/stores`: estado global com Pinia, atualmente usado para autenticacao.
- `src/queries`: camada de cache, queries e mutations de atendimento com Vue Query.
- `src/services`: camada de comunicacao HTTP com o backend.
- `src/boot`: inicializacao de Axios, Pinia, Vue Query e I18n no Quasar.
- `src/types`: interfaces e enums do dominio de atendimento.
- `src/helpers` e `src/utils`: funcoes auxiliares de data, tempo e geracao de senha.
- `db/db.json`: banco local usado pelo `json-server`.

O backend atual nao e uma API propria. Ele e simulado com `json-server`, usando `db/db.json` e expondo o recurso `/atendimentos` em `http://localhost:3001`.

## Funcionalidades implementadas

- Login com token fake salvo em `localStorage`.
- Protecao de rotas autenticadas via guard do Vue Router.
- Layout principal com header, sidebar, footer, botao flutuante de novo atendimento e modal global.
- Footer estruturado com `q-footer`, acompanhando melhor o layout do Quasar.
- Navegacao entre Dashboard, Triagem, Consulta e Finalizados.
- Cadastro de atendimento com nome, encaminhamento, senha gerada, status, estagio e observacoes.
- Novos atendimentos recebem `criadoEm` automaticamente na mutation de criacao.
- Listagem de atendimentos por estagio:
  - triagem;
  - consulta em andamento;
  - finalizados.
- Leitura de atendimentos nas telas principais feita com `useAtendimentosQuery`.
- Visualizacao de detalhes do atendimento em modal.
- Edicao de atendimento existente.
- Exclusao de atendimento com confirmacao.
- Avanco de atendimento da triagem para consulta.
- Finalizacao de atendimento.
- Criacao, edicao, exclusao, avanco para consulta e finalizacao feitas por mutations de Vue Query.
- Invalidacao automatica da lista de atendimentos apos mutations bem-sucedidas.
- Notificacoes de sucesso e erro com Quasar Notify nas mutations de atendimento.
- Calculo de tempo de espera, tempo de consulta e tempo total.
- Dashboard com cards de totais, filtro por data, metricas medias e contagem por encaminhamento.
- Tabela responsiva no dashboard, com versao em cards para telas menores.
- Tema claro/escuro persistido em `localStorage`.
- Internacionalizacao configurada com arquivos para `pt-BR`, `en-US` e `es`.
- Tooltips traduzidos para botoes de menu, tema, logout e novo atendimento.
- Build de SPA configurado pelo Quasar.

## Funcionalidades incompletas

- Autenticacao real ainda nao existe. O login aceita qualquer email/senha preenchidos e gera um token fake.
- Nao existe cadastro ou gestao de usuarios.
- Nao ha backend real, banco relacional, regras de autorizacao ou camada de seguranca no servidor.
- Nao ha validacao robusta no backend, porque o `json-server` apenas persiste o JSON.
- O historico clinico e as observacoes sao basicos; nao ha autor, data/hora ou auditoria por observacao.
- O menu mobile tem botao `more_vert`, mas nao apresenta menu de acoes.
- As traducoes existem, mas os arquivos/dados apresentam sinais de encoding quebrado em portugues.
- O componente `DashboardTabs.vue` existe e funciona dentro da tabela, mas nao e usado diretamente na pagina do dashboard.
- Nao existem testes automatizados reais. O script `test` apenas imprime "No test specified".

## Bugs conhecidos

- `src/components/Atendimento/DadosAtendimento.vue` possui `console.log(props.atendimento.encaminhamento)`.
- O tipo `Atendimento` declara `id: number`, mas o `json-server` esta usando IDs string em `db/db.json`. Isso pode causar inconsistencias em atualizacao, remocao e comparacoes.
- Atendimentos antigos ou ja existentes no `db/db.json` ainda podem estar sem `criadoEm`, afetando filtro por data e calculo de espera nesses registros legados.
- A funcao `gerarSenha()` usa numero aleatorio entre 100 e 999, sem garantia de unicidade.
- Ha textos com caracteres quebrados em palavras acentuadas de portugues nos arquivos de i18n, layout e dados.
- O logout no `AppHeader.vue` chama `router.push('/login')` mais de uma vez e tambem faz `window.location.reload()`, o que pode gerar navegacao redundante.
- A base URL da API esta fixa em `http://localhost:3001`, sem variavel de ambiente.
- O arquivo `db/db.json` esta modificado no git, e ha um arquivo deletado `src/router/sistema-saude-comparacao.code-workspace`.

## Pendencias

- Definir se o projeto seguira com `json-server` apenas para prototipo ou se sera criado um backend real.
- Corrigir modelo de dados para alinhar `id` como string ou number em todos os pontos.
- Revisar se registros antigos do `db/db.json` sem `criadoEm` devem ser corrigidos manualmente ou por script.
- Corrigir encoding dos arquivos de i18n, dados e comentarios.
- Remover logs de desenvolvimento.
- Revisar fluxo de logout.
- Parametrizar URL da API via `.env`.
- Implementar testes unitarios para queries, mutations, helpers e servicos.
- Implementar testes de fluxo para criar, editar, avancar, finalizar e excluir atendimento.
- Decidir padrao de persistencia de tema e autenticacao.
- Avaliar remocao ou simplificacao de `src/stores/atendimentoStore.ts`, pois o fluxo atual de atendimento foi migrado para Vue Query.
- Limpar arquivos temporarios `quasar.config.ts.temporary.compiled.*.mjs`, caso nao sejam necessarios.

## Proximos passos recomendados

1. Corrigir os problemas de dados restantes: `id`, encoding, registros legados sem `criadoEm` e geracao de senha unica.
2. Remover `console.log` e simplificar o logout.
3. Criar arquivo `.env` para configurar `VITE_API_URL` ou equivalente no Quasar.
4. Adicionar testes para `tempoAtendimentoHelper`, `dataHelper`, queries/mutations de atendimento e `AtendimentoService`.
5. Substituir login fake por autenticacao real ou documentar explicitamente que e apenas mock.
6. Criar backend real, se o objetivo for producao.
7. Revisar UX mobile do header, principalmente o botao `more_vert`.
8. Padronizar comentarios e nomes de arquivos/componentes.
9. Adicionar tratamento visual de loading nas telas que chamam a API e revisar exibicao de erros de leitura.
10. Atualizar o README com fluxo de execucao completo: frontend, backend mock, lint, build e testes.

## Arquivos mais importantes do projeto

- `package.json`: scripts, dependencias e stack principal.
- `quasar.config.ts`: configuracao do Quasar, boot files, build, CSS, Vite plugins e modos.
- `src/router/routes.ts`: mapa de rotas e telas protegidas.
- `src/router/index.ts`: criacao do router e guard de autenticacao.
- `src/layouts/PaginaPrincipal.vue`: estrutura autenticada principal da aplicacao.
- `src/components/AppHeader.vue`: cabecalho, tema e logout.
- `src/components/AppSidebar.vue`: navegacao lateral.
- `src/components/Atendimento/modalAtendimento.vue`: modal central de criar, visualizar e editar atendimento.
- `src/components/Atendimento/FormsAtendimento.vue`: formulario de atendimento.
- `src/components/Atendimento/cardAtendimento.vue`: card usado nas filas.
- `src/components/Dashboard/DashboardTable.vue`: tabela/listagem do dashboard com tabs.
- `src/components/Dashboard/DashboardCards.vue`: cards de indicadores.
- `src/components/Dashboard/DashboardAnalytics.vue`: filtro por data, medias e encaminhamentos.
- `src/stores/authStore.ts`: estado de autenticacao fake.
- `src/stores/atendimentoStore.ts`: store antiga de atendimento, atualmente candidata a remocao/simplificacao.
- `src/queries/atendimento/atendimento.keys.ts`: query keys de atendimento.
- `src/queries/atendimento/atendimento.queries.ts`: query de listagem de atendimentos.
- `src/queries/atendimento/atendimento.mutations.ts`: mutations de criacao, edicao, exclusao, avanco e finalizacao.
- `src/services/atendimentoService.ts`: chamadas HTTP para `/atendimentos`.
- `src/boot/axios.ts`: instancia Axios e interceptor de erro.
- `src/boot/vue-query.ts`: configuracao do QueryClient e VueQueryPlugin.
- `src/types/atendimento.ts`: modelo principal do dominio.
- `src/types/enums/atendimentoEnums.ts`: enums de estagio, status e encaminhamento.
- `src/helpers/tempoAtendimentoHelper.ts`: calculos de tempo.
- `src/helpers/notifyHelper.ts`: helpers para notificacoes de sucesso e erro com Quasar Notify.
- `db/db.json`: dados locais do backend mock.

## Riscos tecnicos

- Dependencia de `json-server` impede seguranca, autenticacao real, validacao forte e escalabilidade.
- Inconsistencia de tipo do `id` pode quebrar operacoes em cenarios especificos.
- Registros legados sem `criadoEm` comprometem indicadores e filtros de data.
- Falta de testes aumenta risco de regressao nos fluxos principais.
- Base URL fixa dificulta deploy em outros ambientes.
- Token fake em `localStorage` nao oferece seguranca real.
- Dados com encoding quebrado prejudicam UX e confiabilidade visual.
- Geracao aleatoria de senha pode criar duplicidades.
- Ausencia de loading states pode deixar a interface sem feedback durante chamadas de API.
- Erros de mutations agora geram notificacoes, mas erros de leitura ainda precisam de tratamento visual mais consistente.

## Estado atual do frontend

O frontend esta funcional como prototipo avancado. As principais telas existem, a navegacao esta implementada, os modais de atendimento funcionam, ha dashboard com indicadores e a aplicacao compila para SPA.

O fluxo principal de atendimento foi migrado para Vue Query:

- As telas de Dashboard, Triagem, Consulta e Finalizados consomem `useAtendimentosQuery`.
- O modal de atendimento usa mutations para criar, editar, remover, avancar para consulta e finalizar.
- As mutations invalidam a lista de atendimentos apos sucesso.
- As mutations exibem notificacoes de sucesso e erro com Quasar Notify.
- A criacao de atendimento adiciona `criadoEm` automaticamente quando o campo nao vem preenchido.
- A store `src/stores/atendimentoStore.ts` aparentemente nao e mais usada pelo fluxo atual.

Validacoes executadas:

- `npm run lint`: passou sem erros apos as alteracoes de Vue Query, Notify, tooltips e i18n.
- `npm run build`: compilou a SPA com sucesso e gerou saida em `dist/spa`; o comando encerrou por timeout da execucao apos imprimir o resumo do build.

Pontos de atencao no frontend:

- Autenticacao e logout ainda sao simplificados.
- Existem textos com encoding quebrado.
- Falta tratamento consistente de loading e de erro em queries de leitura.
- Falta suite de testes automatizados.
- A store de atendimento deve ser revisada, pois o fluxo principal foi transferido para queries/mutations.

## Estado atual do backend

O backend atual e um mock local com `json-server`.

Configuracao atual:

- Script: `npm run backend`
- Comando: `json-server --watch db/db.json --port 3001`
- Base URL usada pelo frontend: `http://localhost:3001`
- Recurso principal: `/atendimentos`

Esse backend e adequado para desenvolvimento e demonstracao, mas nao esta pronto para producao. Nao ha autenticacao real, autorizacao, logs de auditoria, banco transacional, migrations, validacao server-side ou tratamento de regras de negocio fora do frontend.
