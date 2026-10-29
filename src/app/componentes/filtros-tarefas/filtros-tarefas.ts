import { Component, inject } from '@angular/core';
import { EstadoTarefas } from '../../servicos/estado-tarefas';

@Component({
  selector: 'app-filtros-tarefas',
  styleUrl: './filtros-tarefas.css',
  template: `
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
  `,
})
export class FiltrosTarefas {
  estado = inject(EstadoTarefas);
}
