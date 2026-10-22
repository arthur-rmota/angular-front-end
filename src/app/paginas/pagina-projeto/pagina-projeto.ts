import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Api } from '../../api';
import { CartaoTarefa } from '../../componentes/cartao-tarefa/cartao-tarefa';
import { formatarData } from '../../rotulos';

@Component({
  selector: 'app-pagina-projeto',
  imports: [RouterLink, CartaoTarefa],
  template: `
    @if (projeto.hasValue()) {
      @let p = projeto.value();
      <h1>{{ p.nome }}</h1>
      <p>{{ p.descricao }}</p>
      <p class="detalhes">{{ p.disciplina }} · criado em {{ formatarData(p.criadoEm) }}</p>

      <div class="acoes">
        <a class="botao" routerLink="/projetos" >← Voltar para os projetos</a>
        <a class="botao" [routerLink]="['/projetos', p.id, 'editar']">Editar projeto</a>
      </div>

      <h2>Tarefas do projeto</h2>
      <div class="acoes">
        <a class="botao" routerLink="/tarefas/nova" [queryParams]="{ projetoId: p.id }">+ Nova tarefa neste projeto</a>
      </div>
      <div class="grade">
        @for (tarefa of p.tarefas; track tarefa.id) {
          <app-cartao-tarefa [tarefa]="tarefa" />
        }
      </div>
    }
  `,
})
export class PaginaProjeto {
  private api = inject(Api);

  id = input.required<string>();

  projeto = rxResource({
    params: () => this.id(),
    stream: ({ params: id }) => this.api.buscarProjeto(id),
  });

  protected formatarData = formatarData;
}
