import { Routes } from '@angular/router';
import { ListaTarefas } from './paginas/lista-tarefas/lista-tarefas';
import { DetalheTarefa } from './paginas/detalhe-tarefa/detalhe-tarefa';
import { ListaProjetos } from './paginas/lista-projetos/lista-projetos';
import { PaginaProjeto } from './paginas/pagina-projeto/pagina-projeto';
import { NaoEncontrada } from './paginas/nao-encontrada/nao-encontrada';

export const routes: Routes = [
  { path: '', component: ListaTarefas, title: 'Tarefas' },
  { path: 'tarefas/:id', component: DetalheTarefa, title: 'Tarefa' },
  { path: 'projetos', component: ListaProjetos, title: 'Projetos' },
  { path: 'projetos/:id', component: PaginaProjeto, title: 'Projeto' },
  { path: '**', component: NaoEncontrada, title: 'Página não encontrada' },
];
