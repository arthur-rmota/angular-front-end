import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Api } from '../../api';
import { formatarData, rotuloPrioridade, rotuloStatus } from '../../rotulos';

@Component({
  selector: 'app-detalhe-tarefa',
  imports: [RouterLink],
  template: `
    <a routerLink="/">← Voltar para as tarefas</a>
    @if (tarefa.hasValue()) {
      @let t = tarefa.value();
      <h1>{{ t.titulo }}</h1>
      <dl class="campos">
        <dt>Descrição</dt><dd>{{ t.descricao }}</dd>
        <dt>Status</dt><dd>{{ rotuloStatus[t.status] }}</dd>
        <dt>Prioridade</dt><dd>{{ rotuloPrioridade[t.prioridade] }}</dd>
        <dt>Responsável</dt><dd>{{ t.responsavel }}</dd>
        <dt>Prazo</dt><dd>{{ formatarData(t.prazo) }}</dd>
        <dt>Projeto</dt><dd><a [routerLink]="['/projetos', t.projetoId]">Ver projeto</a></dd>
      </dl>
    }
  `,
})
export class DetalheTarefa {
  private api = inject(Api);

  // Vem do :id da URL (withComponentInputBinding no app.config.ts)
  id = input.required<string>();

  tarefa = rxResource({
    params: () => this.id(),
    stream: ({ params: id }) => this.api.buscarTarefa(id),
  });

  protected rotuloStatus = rotuloStatus;
  protected rotuloPrioridade = rotuloPrioridade;
  protected formatarData = formatarData;
}
