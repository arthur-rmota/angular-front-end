import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Api } from '../../api';

@Component({
  selector: 'app-lista-projetos',
  imports: [RouterLink],
  templateUrl: './lista-projetos.html',
  styleUrl: './lista-projetos.css',
})
export class ListaProjetos {
  private api = inject(Api);

  projetos = rxResource({
    stream: () => this.api.listarProjetos()
  });
}