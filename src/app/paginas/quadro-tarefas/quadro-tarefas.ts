import { Component, inject, effect, untracked } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Api } from '../../api';
import { CartaoTarefa } from '../../componentes/cartao-tarefa/cartao-tarefa';
import { FiltrosTarefas } from '../../componentes/filtros-tarefas/filtros-tarefas';
import { AlternarVisao } from '../../componentes/alternar-visao/alternar-visao';
import { EstadoTarefas } from '../../servicos/estado-tarefas';
import type {Status, Tarefa} from '../../../tipos';


@Component({
  selector: 'app-quadro-tarefas',
  imports: [RouterLink, CartaoTarefa, FiltrosTarefas, AlternarVisao],
  styleUrl: './quadro-tarefas.css',
  templateUrl: './quadro-tarefas.html',
})
export class QuadroTarefas {
  private api = inject(Api);
  estado = inject(EstadoTarefas);

  tarefas = rxResource({
    stream: () => this.api.listarTarefas(),
  });

  colunas: { status: Status; titulo: string }[] = [
    { status: 'a-fazer', titulo: 'A fazer' },
    { status: 'em-andamento', titulo: 'Em andamento' },
    { status: 'em-revisao', titulo: 'Em revisão' },
    { status: 'concluida', titulo: 'Concluída' },
  ];

  constructor() {
   effect(() => { 
    const tarefas = this.tarefas.value();

    if (tarefas) {
      untracked(() => this.estado.definirTarefas(tarefas));
    }
    });
  }

  tarefasPorStatus(status: Status): Tarefa[] {
    return this.estado.tarefasFiltradas().filter(
      tarefa => tarefa.status === status
    );
  }
}
