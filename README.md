# Projeto G2 — Gerenciador de Tarefas Acadêmicas

## 1. Apresentação

O **Gerenciador de Tarefas Acadêmicas** é uma aplicação web desenvolvida no contexto acadêmico com o propósito de apoiar a organização e o acompanhamento de atividades relacionadas a projetos e disciplinas. O sistema permite registrar projetos, administrar tarefas vinculadas a eles e acompanhar o andamento das atividades por meio de diferentes formas de visualização.

A aplicação foi construída com Angular e TypeScript no frontend e utiliza o JSON Server como solução de API REST local para persistência dos dados durante o desenvolvimento.

## 2. Objetivos

### 2.1 Objetivo geral

Desenvolver uma aplicação web que auxilie no planejamento, na organização e no acompanhamento de tarefas acadêmicas, reunindo em um único ambiente as informações sobre projetos, responsáveis, prazos, prioridades e situação das atividades.

### 2.2 Objetivos específicos

- Cadastrar, consultar, editar e excluir projetos;
- Cadastrar, consultar, editar e excluir tarefas;
- Associar tarefas aos respectivos projetos;
- Identificar responsáveis e prazos das atividades;
- Classificar tarefas por prioridade e situação;
- Consultar atividades em formato de lista;
- Acompanhar o fluxo de trabalho por meio de um quadro Kanban;
- Aplicar filtros para facilitar a localização das tarefas.

## 3. Funcionalidades

### 3.1 Gerenciamento de projetos

O sistema disponibiliza operações de criação, consulta, edição e exclusão de projetos. Cada projeto reúne informações como nome, descrição, disciplina e data de criação.

### 3.2 Gerenciamento de tarefas

As tarefas podem ser cadastradas, consultadas, editadas e excluídas. Cada registro contém informações de título, descrição, projeto associado, responsável, prazo, prioridade e situação.

### 3.3 Organização por situação

As tarefas são classificadas de acordo com as seguintes situações:

- **A fazer:** atividade ainda não iniciada;
- **Em andamento:** atividade em execução;
- **Em revisão:** atividade que aguarda ou está passando por revisão;
- **Concluída:** atividade finalizada.

### 3.4 Classificação por prioridade

As prioridades disponíveis são:

- Baixa;
- Média;
- Alta.

### 3.5 Visualização e filtragem

A aplicação oferece visualização das tarefas em lista e em quadro Kanban. Também disponibiliza mecanismos de filtragem e busca para auxiliar na localização de atividades, considerando os critérios disponíveis na interface, como título, situação e prioridade.

### 3.6 Quadro Kanban

O quadro Kanban organiza as tarefas em colunas correspondentes às situações do fluxo de trabalho. A movimentação entre as colunas é realizada por meio de interação de arrastar e soltar, permitindo atualizar a situação da tarefa.

## 4. Tecnologias utilizadas

| Tecnologia | Aplicação no projeto |
|---|---|
| Angular | Desenvolvimento da interface e estrutura do frontend |
| TypeScript | Linguagem de programação e tipagem do código |
| Angular Router | Navegação entre páginas e componentes |
| Angular Reactive Forms | Construção e validação de formulários |
| Angular CDK | Recursos de interação, incluindo arrastar e soltar |
| RxJS | Composição e tratamento de operações assíncronas |
| JSON Server | Disponibilização de uma API REST local |
| Node.js e npm | Ambiente de execução e gerenciamento de dependências |

## 5. Requisitos para execução

Antes de iniciar o projeto, é necessário possuir os seguintes recursos instalados:

- **Node.js:** versão compatível com as dependências do projeto;
- **npm:** gerenciador de pacotes do Node.js;
- **Navegador atualizado:** para acessar a aplicação.

Recomenda-se utilizar uma versão LTS do Node.js compatível com a versão do Angular utilizada no projeto.

## 6. Instalação e configuração

### 6.1 Obtenção do código-fonte

Faça o download ou clone do repositório do projeto e acesse o diretório raiz:

```bash
cd projeto-g2
```

### 6.2 Instalação das dependências

Execute o comando:

```bash
npm install
```

Esse procedimento instala as dependências necessárias para o funcionamento e o desenvolvimento da aplicação.

## 7. Execução da aplicação

A execução local requer dois processos: o servidor da API e o servidor de desenvolvimento do Angular.

### 7.1 Inicialização da API

Abra um terminal na pasta raiz do projeto e execute:

```bash
npx json-server db.json --port 3000
```

A API será disponibilizada localmente no endereço:

```text
http://localhost:3000
```

O arquivo `db.json`, localizado na raiz do projeto, contém os dados utilizados pelo JSON Server. Como essa API é local e baseada em arquivo, as alterações realizadas durante a execução são registradas nesse arquivo.

### 7.2 Inicialização do frontend

Abra outro terminal, também na pasta raiz do projeto, e execute:

```bash
npm run dev
```

O servidor de desenvolvimento do Angular será iniciado. Por padrão, a aplicação poderá ser acessada em:

```text
http://localhost:4200
```

Mantenha os dois processos em execução enquanto utilizar o sistema.

### 7.3 Inicialização pelo Windows

No Windows, o projeto também disponibiliza o arquivo `iniciar.bat`. Ao executá-lo, o script verifica a disponibilidade do npm, instala as dependências caso a pasta `node_modules` não exista e inicia a API e o frontend em janelas separadas.

## 8. API e estrutura dos dados

A aplicação utiliza o JSON Server para disponibilizar operações HTTP sobre os recursos armazenados em `db.json`.

### 8.1 Recursos disponíveis

| Recurso | Endpoint |
|---|---|
| Tarefas | `http://localhost:3000/tarefas` |
| Projetos | `http://localhost:3000/projetos` |

### 8.2 Operações HTTP

O JSON Server disponibiliza operações REST para os recursos:

| Método | Finalidade |
|---|---|
| GET | Consultar registros |
| POST | Cadastrar registros |
| PUT/PATCH | Atualizar registros |
| DELETE | Excluir registros |

Exemplos de consulta:

```http
GET http://localhost:3000/tarefas
GET http://localhost:3000/projetos
```

A API também permite consultar um registro específico pelo identificador, por exemplo:

```http
GET http://localhost:3000/tarefas/1
GET http://localhost:3000/projetos/1
```

### 8.3 Modelo de dados

**Projeto**

| Campo | Descrição |
|---|---|
| `id` | Identificador do projeto |
| `nome` | Nome do projeto |
| `descricao` | Descrição do projeto |
| `disciplina` | Disciplina relacionada |
| `criadoEm` | Data de criação |

**Tarefa**

| Campo | Descrição |
|---|---|
| `id` | Identificador da tarefa |
| `projetoId` | Identificador do projeto associado |
| `titulo` | Título da tarefa |
| `descricao` | Descrição da atividade |
| `status` | Situação atual da tarefa |
| `prioridade` | Nível de prioridade |
| `responsavel` | Pessoa responsável pela atividade |
| `prazo` | Data prevista para conclusão |

Os tipos e interfaces correspondentes estão definidos no arquivo `src/tipos.ts`.

## 9. Estrutura geral do projeto

A organização do código-fonte segue a estrutura de um projeto Angular. Os principais arquivos e diretórios são:

```text
projeto-g2/
├── public/                 # Arquivos estáticos e recursos públicos
├── src/
│   ├── app/                # Componentes, páginas, serviços e recursos da aplicação
│   ├── index.html          # Documento HTML principal
│   ├── main.ts             # Inicialização do frontend
│   ├── main.server.ts      # Inicialização no ambiente de renderização no servidor
│   ├── server.ts           # Configuração do servidor SSR
│   ├── styles.css          # Estilos globais
│   └── tipos.ts            # Interfaces e tipos de dados
├── db.json                 # Base de dados local utilizada pelo JSON Server
├── db.seed.json            # Dados iniciais/semente
├── iniciar.bat             # Script de inicialização para Windows
├── angular.json            # Configurações do Angular CLI
├── package.json            # Dependências e scripts npm
└── README.md               # Documentação do projeto
```

## 10. Comandos disponíveis

Os principais comandos definidos em `package.json` são:

| Comando | Descrição |
|---|---|
| `npm install` | Instala as dependências |
| `npm run dev` | Inicia o servidor de desenvolvimento Angular |
| `npm start` | Inicia o servidor de desenvolvimento Angular |
| `npm run build` | Gera a versão de compilação do projeto |
| `npm run watch` | Executa a compilação em modo de observação |
| `npm test` | Executa os testes configurados |

**Observação:** o script `npm run api` não está definido atualmente em `package.json`. Para iniciar a API, utilize `npx json-server db.json --port 3000`, conforme descrito na seção 7.1.

## 11. Considerações sobre o ambiente de desenvolvimento

O JSON Server é utilizado neste projeto como mecanismo simplificado de simulação de uma API REST. Portanto, a configuração apresentada destina-se ao desenvolvimento e à demonstração local da aplicação. Ela não deve ser interpretada como uma arquitetura de backend pronta para produção.

O arquivo `db.json` funciona como armazenamento local dos registros. Recomenda-se manter uma cópia de segurança dos dados importantes antes de realizar alterações manuais ou substituir esse arquivo.

## 12. Equipe de desenvolvimento

Projeto desenvolvido pela equipe G2:

- Arthur Rodrigues;
- Rebeca Alencar;
- Vitor Cabral.

## 13. Considerações finais

O Gerenciador de Tarefas Acadêmicas busca contribuir para a organização das atividades desenvolvidas em projetos e disciplinas, oferecendo recursos para registrar tarefas, definir prioridades, acompanhar prazos e visualizar o andamento do trabalho.

A aplicação reúne conceitos de desenvolvimento de interfaces web, organização de componentes, tipagem com TypeScript, formulários reativos e integração com serviços HTTP. Dessa forma, o projeto também constitui uma aplicação prática dos conhecimentos relacionados ao desenvolvimento frontend e à construção de sistemas web.
