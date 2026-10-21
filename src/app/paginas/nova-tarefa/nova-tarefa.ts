import { Component, computed, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Api } from '../../api';
import { FormularioTarefa } from '../../componentes/formulario-tarefa/formulario-tarefa';
import type { NovaTarefa as DadosTarefa } from '../../../tipos';

@Component({
  selector: 'app-nova-tarefa',
  imports: [RouterLink, FormularioTarefa],
  template: `
    <a routerLink="/">← Voltar para as tarefas</a>
    <div class="heading"><span class="spark"></span><h1>Nova tarefa</h1></div>
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

  criar(tarefa: DadosTarefa) {
    this.salvando.set(true);
    this.api.criarTarefa(tarefa).subscribe(() => this.router.navigate(['/']));
  }
}
