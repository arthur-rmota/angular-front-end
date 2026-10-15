import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Tarefa } from '../../../tipos';
import { formatarData, rotuloPrioridade, rotuloStatus } from '../../rotulos';

@Component({
  selector: 'app-cartao-tarefa',
  imports: [RouterLink],
  templateUrl: './cartao-tarefa.html',
  styleUrl: './cartao-tarefa.css',
})
export class CartaoTarefa {
  tarefa = input.required<Tarefa>();

  protected rotuloStatus = rotuloStatus;
  protected rotuloPrioridade = rotuloPrioridade;
  protected formatarData = formatarData;
}
