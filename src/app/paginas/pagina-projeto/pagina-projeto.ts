import { Component, inject, input, computed } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { Api } from '../../api';
import { CartaoTarefa } from '../../componentes/cartao-tarefa/cartao-tarefa';
import { BotaoVoltar } from '../../componentes/botao-voltar/botao-voltar';
import { NaoEncontrada } from '../nao-encontrada/nao-encontrada';

import { formatarData } from '../../rotulos';

@Component({
  selector: 'app-pagina-projeto',
  imports: [
    RouterLink,
    CartaoTarefa,
    BotaoVoltar,
    NaoEncontrada
  ],
  templateUrl: './pagina-projeto.html',
  styleUrl: './pagina-projeto.css',
})
export class PaginaProjeto {

  private api = inject(Api);

  id = input.required<string>();

  projeto = rxResource({
    params: () => this.id(),
    stream: ({ params: id }) => this.api.buscarProjeto(id),
  });

  naoExiste = computed(() => {
    return (
      (this.projeto.error() as { status?: number } | undefined)?.status === 404
    );
  });

  protected formatarData = formatarData;
}