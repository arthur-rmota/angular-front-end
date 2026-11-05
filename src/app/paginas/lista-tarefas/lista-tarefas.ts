import { Component, inject, effect, untracked } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Api } from '../../api';
import { CartaoTarefa } from '../../componentes/cartao-tarefa/cartao-tarefa';
import { FiltrosTarefas } from '../../componentes/filtros-tarefas/filtros-tarefas';
import { AlternarVisao } from '../../componentes/alternar-visao/alternar-visao';
import { EstadoTarefas } from '../../servicos/estado-tarefas';

@Component({
  selector: 'app-lista-tarefas',
  imports: [RouterLink, CartaoTarefa, FiltrosTarefas, AlternarVisao],
  template: `
<div class="heading"><span class="spark"></span><h1>Tarefas</h1></div>
    <div class="acoes">
      <a routerLink="/tarefas/nova" class="botao">+ Nova tarefa</a>
      <app-alternar-visao />
    </div>
    
  
<app-filtros-tarefas />

    @if (tarefas.isLoading()) {
      <div class="loading">
        <div class="spinner"> </div>
        <p class="carregando">Carregando...</p>
      </div>
    }
    @if (tarefas.error()) {
      <p class="erro" role="alert">
        ⚠ Não foi possível carregar os dados.
        <button type="button" class="botao-secundario" (click)="tarefas.reload()">Tentar de novo</button>
      </p>
    }
    @if (tarefas.hasValue()) {
      @if (estado.tarefasFiltradas().length > 0) {
        <div class="grade">
        @for (tarefa of estado.tarefasFiltradas(); track tarefa.id) {
          <app-cartao-tarefa [tarefa]="tarefa" (excluida)="tarefas.reload()" />
        }
      </div>
    }@else {
          @if (estado.busca().trim() || estado.status() || estado.prioridade()){
            <p class="vazio"> Nenhuma Tarefa encontrada</p>
        } @else {
          <p class="vazio"> Nenhuma Tarefa cadastrada </p>
        }
      }
    }
  `,
})
export class ListaTarefas {
  private api = inject(Api);
  estado = inject(EstadoTarefas);

  tarefas = rxResource({ 
    stream: () => this.api.listarTarefas() 
  });

  constructor() {
    effect(() => {

    if (this.tarefas.hasValue()) {
      const tarefas = this.tarefas.value();

      untracked(() => {
        this.estado.definirTarefas(tarefas);
      });
    }

  });
  }
}
