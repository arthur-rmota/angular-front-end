import { Component, inject, input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Api, type NovoProjeto } from '../../api';
import { FormularioProjeto } from '../../componentes/formulario-projeto/formulario-projeto';
import { NaoEncontrada } from '../nao-encontrada/nao-encontrada';
import { BotaoVoltar } from '../../componentes/botao-voltar/botao-voltar';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-editar-projeto',
  imports: [ FormularioProjeto, NaoEncontrada, BotaoVoltar],
  template: `
    @if (projeto.hasValue()) {
      
      <div class="heading"><span class="spark"></span><h1>Editar projeto</h1></div>
      <div class="acoes">
        <app-botao-voltar />
      </div>

      @if (erroApi()) { <p class="erro" role="alert">⚠ {{ erroApi() }}</p> }

      <app-formulario-projeto
        [valorInicial]="projeto.value()"
        textoBotao="Salvar alterações"
        [salvando]="salvando()"
        (salvar)="atualizar($event)"
      />
    } @else if (naoExiste()) {
      <app-nao-encontrada />
    } @else {
      @if (projeto.isLoading()) {
      <p class="carregando">Carregando...</p>
    }
    @if (projeto.error()) {
      <p class="erro" role="alert">
        ⚠ Não foi possível carregar os dados. Verifique sua conexão e tente novamente
        <button type="button" class="botao-secundario" (click)="projeto.reload()">Tentar de novo</button>
      </p>
    }
    }
  `,
})
export class EditarProjeto {
  private api = inject(Api);
  private router = inject(Router);

  id = input.required<string>();

  projeto = rxResource({
    params: () => this.id(),
    stream: ({ params: id }) => this.api.buscarProjeto(id),
  });

  salvando = signal(false);

  naoExiste() {
    return (this.projeto.error() as { status?: number } | undefined)?.status === 404;
  }
  erroApi = signal('');

  atualizar(dados: NovoProjeto) {
    this.salvando.set(true);
    this.erroApi.set('');
    this.api.atualizarProjeto(this.id(), dados).pipe(finalize(() => this.salvando.set(false)))
    .subscribe({
      next: () => this.router.navigate(['/projetos', this.id()]),
      error: () => {
        this.erroApi.set('Não foi possível salvar. Verifique a API e tente novamente.');
      },
    });
  }
}