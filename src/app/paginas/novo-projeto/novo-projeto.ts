import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Api, type NovoProjeto } from '../../api';
import { FormularioProjeto } from '../../componentes/formulario-projeto/formulario-projeto';

@Component({
  selector: 'app-novo-projeto',
  imports: [RouterLink, FormularioProjeto],
  template: `
    <a routerLink="/projetos">← Voltar para os projetos</a>
    <div class="heading"><span class="spark"></span><h1>Novo projeto</h1></div>
    @if (erroApi()) { <p class="erro" role="alert">⚠ {{ erroApi() }}</p> }
    <app-formulario-projeto textoBotao="Criar projeto" [salvando]="salvando()" (salvar)="criar($event)" />
  `,
})
export class NovoProjetoPagina {
  private api = inject(Api);
  private router = inject(Router);
  salvando = signal(false);
  erroApi = signal('');

  criar(projeto: NovoProjeto) {
    // atenção: a classe se chama NovoProjeto e o tipo também; veja a nota abaixo
    this.salvando.set(true);
    this.erroApi.set('');
    this.api.criarProjeto(projeto).subscribe({
      next: () => this.router.navigate(['/projetos']),
      error: () => {
        this.salvando.set(false);
        this.erroApi.set('Não foi possível salvar. Tente novamente.');
      },
    });
  }
}