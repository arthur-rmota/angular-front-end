import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  imports: [],
  selector: 'app-botao-voltar',
  styles: ``,
  template: ` <button type="button" class="botao" (click)="voltar()">← Voltar</button> `,
})
export class BotaoVoltar {
  private location = inject(Location);

  voltar(): void {
    this.location.back();
  }
}
