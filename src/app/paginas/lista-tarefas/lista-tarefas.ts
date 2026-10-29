import { Component, inject, effect, untracked } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Api } from '../../api';
import { CartaoTarefa } from '../../componentes/cartao-tarefa/cartao-tarefa';
import { EstadoTarefas } from '../../servicos/estado-tarefas';

@Component({
  selector: 'app-lista-tarefas',
  imports: [RouterLink, CartaoTarefa],
  styleUrl: './lista-tarefas.css',
  template: `
<div class="heading"><span class="spark"></span><h1>Tarefas</h1></div>
    <div class="acoes">
      <a routerLink="/tarefas/nova" class="botao">+ Nova tarefa</a>
    </div>
    
  
<div class="filtros">
  
<div class="campo-filtro">
  <label for="busca-titulo">Buscar por título</label>
  <input
    id="busca-titulo"
    type="search"
    placeholder="Digite o título da tarefa..."
    [value]="estado.busca()"
    (input)="estado.definirBusca($any($event.target).value)"
  />
</div>

  <div class="campo-filtro">
    <label for="filtro-status">Status</label>
    <select
      id="filtro-status"
      [value]="estado.status()"
      (change)="estado.definirStatus($any($event.target).value)"
    >
      <option value="">Todos os status</option>
      <option value="a-fazer">A fazer</option>
      <option value="em-andamento">Em andamento</option>
      <option value="em-revisao">Em revisão</option>
      <option value="concluida">Concluída</option>
    </select>
  </div>

  <div class="campo-filtro">
    <label for="filtro-prioridade">Prioridade</label>
    <select
      id="filtro-prioridade"
      [value]="estado.prioridade()"
      (change)="estado.definirPrioridade($any($event.target).value)"
    >
      <option value="">Todas as prioridades</option>
      <option value="baixa">Baixa</option>
      <option value="media">Média</option>
      <option value="alta">Alta</option>
    </select>
  </div>
</div>


    @if (tarefas.hasValue()) {
      <div class="grade">
        @for (tarefa of estado.tarefasFiltradas(); track tarefa.id) {
          <app-cartao-tarefa [tarefa]="tarefa" />
        }@empty {
          <p>Nenhuma tarefa encontrada!</p>
        }

      </div>
    }
  `,
})
export class ListaTarefas {
  private api = inject(Api);
  estado = inject(EstadoTarefas);

  tarefas = rxResource({ stream: () => this.api.listarTarefas() });

  constructor() {
    effect(
      () => {
        const tarefas = this.tarefas.value();

        if (tarefas) {
          untracked(() => { this.estado.definirTarefas(tarefas) });
        }
      });
  }
}
