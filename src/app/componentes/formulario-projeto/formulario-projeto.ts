import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import type { NovoProjeto } from '../../api';

@Component({
  selector: 'app-formulario-projeto',
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-projeto.html',
  styleUrl: '../formulario-tarefa/formulario-tarefa.css', // reaproveita o visual
})
export class FormularioProjeto {
  valorInicial = input<Partial<NovoProjeto>>({});
  textoBotao = input('Salvar');
  salvando = input(false);
  salvar = output<NovoProjeto>();

  form = inject(FormBuilder).nonNullable.group({
    nome: ['', Validators.required],
    descricao: [''],
    disciplina: ['', Validators.required],
  });

  private mensagens: Record<string, string> = {
    nome: 'Informe o nome do projeto.',
    disciplina: 'Informe a disciplina.',
  };

  constructor() {
    effect(() => this.form.patchValue(this.valorInicial()));
  }

  protected erro(campo: string): string | null {
    const c = this.form.get(campo);
    return c && c.invalid && c.touched ? this.mensagens[campo] : null;
  }

  enviar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.salvar.emit(this.form.getRawValue());
  }
}