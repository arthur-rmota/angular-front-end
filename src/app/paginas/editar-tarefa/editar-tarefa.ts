import { Component, inject, input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Api } from '../../api';
import { FormularioTarefa } from '../../componentes/formulario-tarefa/formulario-tarefa';
import type { NovaTarefa } from '../../../tipos';
import { NaoEncontrada } from '../nao-encontrada/nao-encontrada';
import { finalize } from 'rxjs';
import { BotaoVoltar } from '../../componentes/botao-voltar/botao-voltar';

@Component({
  selector: 'app-editar-tarefa',
  imports: [ FormularioTarefa, NaoEncontrada, BotaoVoltar],
  template: `
    @if (tarefa.hasValue()) {
      <div class="pagina-formulario">
        <div class="heading">
          <span class="spark"></span>
          <h1>Editar tarefa</h1>
        </div>
        <div class="acoes">
          <app-botao-voltar />
        </div>
        @if (erroApi()) {
          <p class="erro" role="alert">⚠ {{ erroApi() }}</p>
        }
        <app-formulario-tarefa
          [valorInicial]="tarefa.value()"
          textoBotao="Salvar alterações"
          [salvando]="salvando()"
          (salvar)="atualizar($event)"
        />
      </div>
    } @else if (naoExiste()) {
      <app-nao-encontrada />
    } @else {
      @if (tarefa.isLoading()) {
        <p class="carregando">Carregando...</p> <div class="spinner"></div>
      } @else if (tarefa.error()) {
        <p class="erro" role="alert">
          ⚠ Não foi possível carregar os dados. Verifique sua conexão e tente novamente
          <button type="button" class="botao-secundario" (click)="tarefa.reload()">
            Tentar de novo
          </button>
        </p>
      }
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

  naoExiste() {
    return (this.tarefa.error() as { status?: number } | undefined)?.status === 404;
  }

  erroApi = signal('');

  atualizar(tarefa: NovaTarefa) {
    this.salvando.set(true);
    this.erroApi.set('');

    this.api.atualizarTarefa(this.id(), tarefa).pipe(finalize(() => this.salvando.set(false))).subscribe({
      next: () => {
        this.router.navigate(['/tarefas', this.id()]);
      },
      error: () => {
        this.erroApi.set('Não foi possível salvar as alterações, Tente novamente');
      },
    });
  }
}
