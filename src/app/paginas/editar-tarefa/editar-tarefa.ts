import { Component, inject, input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { Api } from '../../api';
import { FormularioTarefa } from '../../componentes/formulario-tarefa/formulario-tarefa';
import type { NovaTarefa } from '../../../tipos';
import { NaoEncontrada } from '../nao-encontrada/nao-encontrada';

@Component({
  selector: 'app-editar-tarefa',
  imports: [RouterLink, FormularioTarefa, NaoEncontrada],
  template: `
    @if (tarefa.hasValue()) {
      <div class="pagina-formulario">
        <div class="heading"><span class="spark"></span><h1>Editar tarefa</h1></div>
        <div class="acoes">
          <a [routerLink]="['/tarefas', id()]" class="botao">← Voltar para a tarefa</a>
        </div>
        <app-formulario-tarefa
          [valorInicial]="tarefa.value()"
          textoBotao="Salvar alterações"
          [salvando]="salvando()"
          (salvar)="atualizar($event)"
        />
      </div>
    } @else if (tarefa.error()) {
      <app-nao-encontrada />
    }
  `,
})
export class EditarTarefa {
  private api = inject(Api);
  private router = inject(Router);

  id = input.required<string>();

  tarefa = rxResource({
    params: () => this.id(),
    stream: ({ params: id }) => this.api.buscarTarefa(id),
  });

  salvando = signal(false);

  atualizar(tarefa: NovaTarefa) {
    this.salvando.set(true);
    this.api.atualizarTarefa(this.id(), tarefa).subscribe(() => this.router.navigate(['/tarefas', this.id()]));
  }
}
