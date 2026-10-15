import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nao-encontrada',
  imports: [RouterLink],
  template: `
    <div class="pagina-nao-encontrada">
      <div class="card-erro">
        <h1>Página não encontrada</h1>

        <div class="etiquetas">
          <span class="etiqueta status">Erro 404</span>
          <span class="etiqueta prioridade">Página indisponível</span>
        </div>

        <p class="mensagem">
          🔎 Não encontramos o endereço que você tentou acessar.
        </p>

        <a routerLink="/" class="link-voltar">
          ← Voltar para as tarefas
        </a>
      </div>
    </div>
  `,
  styleUrl: './nao-encontrada.css',
})
export class NaoEncontrada {}