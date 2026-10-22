import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Api } from '../../api';

@Component({
  selector: 'app-lista-projetos',
  imports: [RouterLink],
  template: `
  <div class="heading"><span class="spark"></span><h1>Projetos</h1></div>
  <p><a routerLink="/projetos/novo">+ Novo projeto</a></p>
    @if (projetos.hasValue()) {
      <ul class="lista-projetos">
        @for (projeto of projetos.value(); track projeto.id) {
          <li>
            <a [routerLink]="['/projetos', projeto.id]">{{ projeto.nome }}</a>
            <span>{{ projeto.disciplina }}</span>
          </li>
        }
      </ul>
    }
  `,
})
export class ListaProjetos {
  private api = inject(Api);
  projetos = rxResource({ stream: () => this.api.listarProjetos() });
}
