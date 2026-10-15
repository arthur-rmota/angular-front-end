import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nao-encontrada',
  imports: [RouterLink],
  template: `
    <h1>Página não encontrada</h1>
    <p>O endereço que você abriu não existe.</p>
    <a routerLink="/">Ir para as tarefas</a>
  `,
})
export class NaoEncontrada {}
