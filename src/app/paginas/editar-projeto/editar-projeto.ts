import { Component, inject, input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { Api, type NovoProjeto } from '../../api';
import { FormularioProjeto } from '../../componentes/formulario-projeto/formulario-projeto';
import { NaoEncontrada } from '../nao-encontrada/nao-encontrada';

@Component({
  selector: 'app-editar-projeto',
  imports: [RouterLink, FormularioProjeto, NaoEncontrada],
  template: `
    @if (projeto.hasValue()) {
      <a [routerLink]="['/projetos', id()]">← Voltar para o projeto</a>
      <div class="heading"><span class="spark"></span><h1>Editar projeto</h1></div>

      @if (erroApi()) { <p class="erro" role="alert">⚠ {{ erroApi() }}</p> }

      <app-formulario-projeto
        [valorInicial]="projeto.value()"
        textoBotao="Salvar alterações"
        [salvando]="salvando()"
        (salvar)="atualizar($event)"
      />
    } @else if (projeto.error()) {
      <app-nao-encontrada />
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
  erroApi = signal('');

  atualizar(dados: NovoProjeto) {
    this.salvando.set(true);
    this.erroApi.set('');
    this.api.atualizarProjeto(this.id(), dados).subscribe({
      next: () => this.router.navigate(['/projetos', this.id()]),
      error: () => {
        this.salvando.set(false);
        this.erroApi.set('Não foi possível salvar. Verifique a API e tente novamente.');
      },
    });
  }
}