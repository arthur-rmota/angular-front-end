import { Component, computed, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Api } from '../../api';
import { FormularioTarefa } from '../../componentes/formulario-tarefa/formulario-tarefa';
import type { NovaTarefa as DadosTarefa } from '../../../tipos';
import { sign } from 'crypto';

@Component({
  selector: 'app-nova-tarefa',
  imports: [RouterLink, FormularioTarefa],
  template: `
    <div class="heading"><span class="spark"></span><h1>Nova tarefa</h1></div>
    <div class="acoes">
      <a routerLink="/" class="botao">← Voltar para as tarefas</a>
    </div>
    @if (erroApi()) { <p class="erro" role="alert">⚠ {{ erroApi() }}</p> } 
    <app-formulario-tarefa
      [valorInicial]="valorInicial()"
      textoBotao="Criar tarefa"
      [salvando]="salvando()"
      (salvar)="criar($event)"
    />
  `,
})
export class NovaTarefa {
  private api = inject(Api);
  private router = inject(Router);

  // Vem do ?projetoId= quando a tela é aberta pela página de um projeto
  projetoId = input<string>();

  valorInicial = computed(() => (this.projetoId() ? { projetoId: this.projetoId() } : {}));
  salvando = signal(false);

  erroApi = signal('');
  
    criar(tarefa: DadosTarefa) {
    this.salvando.set(true);
    this.erroApi.set('')
    this.api.criarTarefa(tarefa).subscribe({
    next: () => this.router.navigate(['/']),
    error: () => {
      this.salvando.set(false);
      this.erroApi.set('Não foi possível salvar. Verifique a API e tente novamente.');
    },
  });
  }
}
