# Status do Projeto - Sistema Saude

Atualizado em: 10/06/2026

## Visao geral da arquitetura

O projeto e uma aplicacao frontend SPA feita com Quasar 2, Vue 3, TypeScript, Vue Router, Pinia, Axios, Tailwind CSS e Vue I18n.

A arquitetura esta organizada em camadas simples:

- `src/pages`: telas principais da aplicacao.
- `src/layouts`: layout autenticado principal.
- `src/components`: componentes reutilizaveis de dashboard, atendimento, header e menu lateral.
- `src/stores`: estado global com Pinia para autenticacao e atendimentos.
- `src/services`: camada de comunicacao HTTP com o backend.
- `src/boot`: inicializacao de Axios, Pinia e I18n no Quasar.
- `src/types`: interfaces e enums do dominio de atendimento.
- `src/helpers` e `src/utils`: funcoes auxiliares de data, tempo e geracao de senha.
- `db/db.json`: banco local usado pelo `json-server`.

O backend atual nao e uma API propria. Ele e simulado com `json-server`, usando `db/db.json` e expondo o recurso `/atendimentos` em `http://localhost:3001`.

## Funcionalidades implementadas

- Login com token fake salvo em `localStorage`.
- Protecao de rotas autenticadas via guard do Vue Router.
- Layout principal com header, sidebar, footer, botao flutuante de novo atendimento e modal global.
- Navegacao entre Dashboard, Triagem, Consulta e Finalizados.
- Cadastro de atendimento com nome, encaminhamento, senha gerada, status, estagio e observacoes.
- Listagem de atendimentos por estagio:
  - triagem;
  - consulta em andamento;
  - finalizados.
- Visualizacao de detalhes do atendimento em modal.
- Edicao de atendimento existente.
- Exclusao de atendimento com confirmacao.
- Avanco de atendimento da triagem para consulta.
- Finalizacao de atendimento.
- Calculo de tempo de espera, tempo de consulta e tempo total.
- Dashboard com cards de totais, filtro por data, metricas medias e contagem por encaminhamento.
- Tabela responsiva no dashboard, com versao em cards para telas menores.
- Tema claro/escuro persistido em `localStorage`.
- Internacionalizacao configurada com arquivos para `pt-BR`, `en-US` e `es`.
- Build de SPA configurado pelo Quasar.

## Funcionalidades incompletas

- Autenticacao real ainda nao existe. O login aceita qualquer email/senha preenchidos e gera um token fake.
- Nao existe cadastro ou gestao de usuarios.
- Nao ha backend real, banco relacional, regras de autorizacao ou camada de seguranca no servidor.
- Nao ha validacao robusta no backend, porque o `json-server` apenas persiste o JSON.
- O cadastro de novo atendimento nao preenche `criadoEm`, embora filtros e calculos dependam desse campo.
- O historico clinico e as observacoes sao basicos; nao ha autor, data/hora ou auditoria por observacao.
- O menu mobile tem botao `more_vert`, mas nao apresenta menu de acoes.
- As traducoes existem, mas os arquivos/dados apresentam sinais de encoding quebrado em portugues.
- O componente `DashboardTabs.vue` existe e funciona dentro da tabela, mas nao e usado diretamente na pagina do dashboard.
- Nao existem testes automatizados reais. O script `test` apenas imprime "No test specified".

## Bugs conhecidos

- `src/components/Atendimento/DadosAtendimento.vue` possui `console.log(props.atendimento.encaminhamento)`.
- O tipo `Atendimento` declara `id: number`, mas o `json-server` esta usando IDs string em `db/db.json`. Isso pode causar inconsistencias em atualizacao, remocao e comparacoes.
- Novos atendimentos podem ficar sem `criadoEm`, afetando filtro por data e calculo de espera.
- A funcao `gerarSenha()` usa numero aleatorio entre 100 e 999, sem garantia de unicidade.
- Ha textos com caracteres quebrados em palavras acentuadas de portugues nos arquivos de i18n, layout e dados.
- O logout no `AppHeader.vue` chama `router.push('/login')` mais de uma vez e tambem faz `window.location.reload()`, o que pode gerar navegacao redundante.
- A base URL da API esta fixa em `http://localhost:3001`, sem variavel de ambiente.
- O arquivo `db/db.json` esta modificado no git, e ha um arquivo deletado `src/router/sistema-saude-comparacao.code-workspace`.

## Pendencias

- Definir se o projeto seguira com `json-server` apenas para prototipo ou se sera criado um backend real.
- Corrigir modelo de dados para alinhar `id` como string ou number em todos os pontos.
- Gravar `criadoEm` automaticamente ao criar atendimento.
- Corrigir encoding dos arquivos de i18n, dados e comentarios.
- Remover logs de desenvolvimento.
- Revisar fluxo de logout.
- Parametrizar URL da API via `.env`.
- Implementar testes unitarios para stores, helpers e servicos.
- Implementar testes de fluxo para criar, editar, avancar, finalizar e excluir atendimento.
- Decidir padrao de persistencia de tema e autenticacao.
- Limpar arquivos temporarios `quasar.config.ts.temporary.compiled.*.mjs`, caso nao sejam necessarios.

## Proximos passos recomendados

1. Corrigir os problemas de dados: `id`, `criadoEm`, encoding e geracao de senha unica.
2. Remover `console.log` e simplificar o logout.
3. Criar arquivo `.env` para configurar `VITE_API_URL` ou equivalente no Quasar.
4. Adicionar testes para `tempoAtendimentoHelper`, `dataHelper`, `atendimentoStore` e `AtendimentoService`.
5. Substituir login fake por autenticacao real ou documentar explicitamente que e apenas mock.
6. Criar backend real, se o objetivo for producao.
7. Revisar UX mobile do header, principalmente o botao `more_vert`.
8. Padronizar comentarios e nomes de arquivos/componentes.
9. Adicionar tratamento visual de erro/loading nas telas que chamam a API.
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
- `src/stores/atendimentoStore.ts`: regras de carregamento, criacao, atualizacao, exclusao, avanco e finalizacao.
- `src/services/atendimentoService.ts`: chamadas HTTP para `/atendimentos`.
- `src/boot/axios.ts`: instancia Axios e interceptor de erro.
- `src/types/atendimento.ts`: modelo principal do dominio.
- `src/types/enums/atendimentoEnums.ts`: enums de estagio, status e encaminhamento.
- `src/helpers/tempoAtendimentoHelper.ts`: calculos de tempo.
- `db/db.json`: dados locais do backend mock.

## Riscos tecnicos

- Dependencia de `json-server` impede seguranca, autenticacao real, validacao forte e escalabilidade.
- Inconsistencia de tipo do `id` pode quebrar operacoes em cenarios especificos.
- Falta de `criadoEm` em novos registros compromete indicadores e filtros.
- Falta de testes aumenta risco de regressao nos fluxos principais.
- Base URL fixa dificulta deploy em outros ambientes.
- Token fake em `localStorage` nao oferece seguranca real.
- Dados com encoding quebrado prejudicam UX e confiabilidade visual.
- Geracao aleatoria de senha pode criar duplicidades.
- Ausencia de loading/error states pode deixar a interface sem feedback em falhas de API.

## Estado atual do frontend

O frontend esta funcional como prototipo avancado. As principais telas existem, a navegacao esta implementada, os modais de atendimento funcionam, ha dashboard com indicadores e a aplicacao compila para SPA.

Validacoes executadas:

- `npm run lint`: passou sem erros.
- `npm run build`: compilou a SPA com sucesso e gerou saida em `dist/spa`; o comando encerrou por timeout da execucao apos imprimir o resumo do build.

Pontos de atencao no frontend:

- Autenticacao e logout ainda sao simplificados.
- Existem textos com encoding quebrado.
- Falta tratamento consistente de loading e erro.
- Falta suite de testes automatizados.
- Algumas escolhas de estado global e modal funcionam, mas ainda sao simples para um sistema maior.

## Estado atual do backend

O backend atual e um mock local com `json-server`.

Configuracao atual:

- Script: `npm run backend`
- Comando: `json-server --watch db/db.json --port 3001`
- Base URL usada pelo frontend: `http://localhost:3001`
- Recurso principal: `/atendimentos`

Esse backend e adequado para desenvolvimento e demonstracao, mas nao esta pronto para producao. Nao ha autenticacao real, autorizacao, logs de auditoria, banco transacional, migrations, validacao server-side ou tratamento de regras de negocio fora do frontend.
