import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-alternar-visao',
  imports: [RouterLink, RouterLinkActive],
  styleUrl: './alternar-visao.css',
  template: `
    <nav class="visoes" aria-label="Visão das tarefas">
      <a routerLink="/" routerLinkActive="ativa" ariaCurrentWhenActive="page" [routerLinkActiveOptions]="{ exact: true }">Lista</a>
      <a routerLink="/quadro" routerLinkActive="ativa" ariaCurrentWhenActive="page">Quadro</a>
    </nav>
  `,
})
export class AlternarVisao {}
