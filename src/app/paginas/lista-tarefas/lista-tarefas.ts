import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Api } from '../../api';
import { CartaoTarefa } from '../../componentes/cartao-tarefa/cartao-tarefa';

@Component({
  selector: 'app-lista-tarefas',
  imports: [CartaoTarefa],
  template: `
<div class="heading"><span class="spark"></span><h1>Tarefas</h1></div>
    @if (tarefas.hasValue()) {
      <div class="grade">
        @for (tarefa of tarefas.value(); track tarefa.id) {
          <app-cartao-tarefa [tarefa]="tarefa" />
        }
      </div>
    }
  `,
})
export class ListaTarefas {
  private api = inject(Api);
  tarefas = rxResource({ stream: () => this.api.listarTarefas() });
}
