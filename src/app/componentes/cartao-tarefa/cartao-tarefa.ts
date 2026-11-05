import { Component, inject, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Api } from '../../api';
import type { Tarefa } from '../../../tipos';
import { formatarData, rotuloPrioridade, rotuloStatus } from '../../rotulos';
import { finalize } from 'rxjs';
import { sign } from 'crypto';

@Component({
  selector: 'app-cartao-tarefa',
  imports: [RouterLink],
  templateUrl: './cartao-tarefa.html',
  styleUrl: './cartao-tarefa.css',
})
export class CartaoTarefa {
  private api = inject(Api);

  erroExclusao = signal('');
  excluindo = signal(false);

  tarefa = input.required<Tarefa>();
  excluida = output<void>();

  protected rotuloStatus = rotuloStatus;
  protected rotuloPrioridade = rotuloPrioridade;
  protected formatarData = formatarData;

  excluir() {
    this.erroExclusao.set('');

    if (!confirm(`Excluir a Tarefa "${this.tarefa().titulo}"?`)) {
      return;
    }

    this.excluindo.set(true);

    this.api
      .excluirTarefa(this.tarefa().id)
      .pipe(finalize(() => this.excluindo.set(false)))
      .subscribe({
        next: () => {
          this.excluida.emit();
        },
        error: () => {
          this.erroExclusao.set('Falha ao excluir, Tente novamente');
        },
      });
  }
}
