import { Routes } from '@angular/router';
import { ListaTarefas } from './paginas/lista-tarefas/lista-tarefas';
import { DetalheTarefa } from './paginas/detalhe-tarefa/detalhe-tarefa';
import { ListaProjetos } from './paginas/lista-projetos/lista-projetos';
import { PaginaProjeto } from './paginas/pagina-projeto/pagina-projeto';
import { NovaTarefa } from './paginas/nova-tarefa/nova-tarefa';
import { EditarTarefa } from './paginas/editar-tarefa/editar-tarefa';
import { NaoEncontrada } from './paginas/nao-encontrada/nao-encontrada';
import { NovoProjetoPagina } from './paginas/novo-projeto/novo-projeto';
import { EditarProjeto } from './paginas/editar-projeto/editar-projeto';
import { QuadroTarefas } from './paginas/quadro-tarefas/quadro-tarefas';

export const routes: Routes = [
  { path: '', component: ListaTarefas, title: 'Tarefas' },
  { path: 'tarefas/nova', component: NovaTarefa, title: 'Nova tarefa' },
  { path: 'tarefas/:id', component: DetalheTarefa, title: 'Tarefa' },
  { path: 'tarefas/:id/editar', component: EditarTarefa, title: 'Editar tarefa' },
  { path: 'projetos', component: ListaProjetos, title: 'Projetos' },
  { path: 'projetos/novo', component: NovoProjetoPagina, title: 'Novo Projeto'},
  { path: 'projetos/:id', component: PaginaProjeto, title: 'Projeto' },
  { path: 'projetos/:id/editar', component: EditarProjeto, title: 'Editar projeto' },
  { path: 'quadro', component: QuadroTarefas, title: 'Quadro de tarefas'},
  { path: '**', component: NaoEncontrada, title: 'Página não encontrada' },
];
