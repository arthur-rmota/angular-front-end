import { Component, inject, effect, untracked } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Api } from '../../api';
import { CartaoTarefa } from '../../componentes/cartao-tarefa/cartao-tarefa';
import { EstadoTarefas } from '../../servicos/estado-tarefas';

@Component({
  selector: 'app-lista-tarefas',
  imports: [RouterLink, CartaoTarefa],
  template: `
<div class="heading"><span class="spark"></span><h1>Tarefas</h1></div>
    <div class="acoes">
      <a routerLink="/tarefas/nova" class="botao">+ Nova tarefa</a>
    </div>
    @if (tarefas.hasValue()) {
      <div class="grade">
        @for (tarefa of tarefas.value(); track tarefa.id) {
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

      if(tarefas){
        untracked(() => {this.estado.definirTarefas(tarefas)});
      }
    });
  }
}
