import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Api } from '../../api';
import { formatarData, rotuloPrioridade, rotuloStatus } from '../../rotulos';
import { NaoEncontrada } from '../nao-encontrada/nao-encontrada';

@Component({
  selector: 'app-detalhe-tarefa',
  imports: [RouterLink, NaoEncontrada],
  template: `
    @if (tarefa.hasValue()) {
      @let t = tarefa.value();
      <h1>{{ t.titulo }}</h1>
      <div class="acoes">
        <a routerLink="/" class="botao">← Voltar para as tarefas</a>
      </div>
      <dl class="campos">
        <dt>Descrição</dt><dd>{{ t.descricao }}</dd>
        <dt>Status</dt><dd>{{ rotuloStatus[t.status] }}</dd>
        <dt>Prioridade</dt><dd>{{ rotuloPrioridade[t.prioridade] }}</dd>
        <dt>Responsável</dt><dd>{{ t.responsavel }}</dd>
        <dt>Prazo</dt><dd>{{ formatarData(t.prazo) }}</dd>
        <dt>Projeto</dt><dd><a [routerLink]="['/projetos', t.projetoId]">Ver projeto</a></dd>
        <p><a [routerLink]="['/tarefas', t.id, 'editar']" class="botao">Editar tarefa</a></p>
      </dl>
      
    } @else {
      <app-nao-encontrada />
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
