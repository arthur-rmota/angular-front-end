import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Api } from '../../api';
import type { Tarefa } from '../../../tipos';
import { formatarData, rotuloPrioridade, rotuloStatus } from '../../rotulos';

@Component({
  selector: 'app-cartao-tarefa',
  imports: [RouterLink],
  templateUrl: './cartao-tarefa.html',
  styleUrl: './cartao-tarefa.css',
})
export class CartaoTarefa {
  private api = inject(Api);

  tarefa = input.required<Tarefa>();
  excluida = output<void>();

  protected rotuloStatus = rotuloStatus;
  protected rotuloPrioridade = rotuloPrioridade;
  protected formatarData = formatarData;

  excluir() {
    if (!confirm(`Excluir a tarefa "${this.tarefa().titulo}"?`)) return;

    this.api.excluirTarefa(this.tarefa().id).subscribe({
      next: () => this.excluida.emit(),
      error: () => alert('Não foi possível excluir a tarefa. Tente de novo.'),
    });
  }
}
