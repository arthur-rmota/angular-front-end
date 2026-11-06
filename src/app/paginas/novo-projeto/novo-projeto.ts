import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Api, type NovoProjeto } from '../../api';
import { FormularioProjeto } from '../../componentes/formulario-projeto/formulario-projeto';
import { BotaoVoltar } from '../../componentes/botao-voltar/botao-voltar';

@Component({
  selector: 'app-novo-projeto',
  imports: [FormularioProjeto, BotaoVoltar],
  template: `
    <div class="heading"><span class="spark"></span><h1>Novo projeto</h1></div>
    <div class="acoes">
      <app-botao-voltar />
    </div>
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