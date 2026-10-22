import { Component, effect, inject, input, output } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Api } from '../../api';
import type { NovaTarefa, Prioridade, Status } from '../../../tipos';
import { rotuloPrioridade, rotuloStatus } from '../../rotulos';

// Usado tanto na tela de nova tarefa quanto na de edição.
// Quem usa passa os valores iniciais (se tiver) e recebe a tarefa pronta no (salvar).
@Component({
  selector: 'app-formulario-tarefa',
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-tarefa.html',
  styleUrl: './formulario-tarefa.css',
})
export class FormularioTarefa {
  private api = inject(Api);

  valorInicial = input<Partial<NovaTarefa>>({});
  textoBotao = input('Salvar');
  salvando = input(false);
  salvar = output<NovaTarefa>();

  projetos = rxResource({ stream: () => this.api.listarProjetos() });

  form = inject(FormBuilder).nonNullable.group({
    titulo: ['', Validators.required],
    descricao: [''],
    projetoId: ['', Validators.required],
    status: ['a-fazer' as Status, Validators.required],
    prioridade: ['media' as Prioridade, Validators.required],
    responsavel: ['', Validators.required],
    prazo: ['', Validators.required],
  });

  protected status = Object.entries(rotuloStatus);
  protected prioridades = Object.entries(rotuloPrioridade);

  private mensagens: Record<string, string> = {
    titulo: 'Informe o título da tarefa.',
    projetoId: 'Escolha um projeto.',
    responsavel: 'Informe o responsável.',
    prazo: 'Informe o prazo.',
  };


  protected erro(campo: string): string | null {
    const c = this.form.get(campo);
    return c && c.invalid && c.touched ? this.mensagens[campo] : null;
  }
  

  constructor() {
    // Na edição a tarefa chega depois (vem da API), então preenche quando mudar
    effect(() => this.form.patchValue(this.valorInicial()));
  }

  enviar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.salvar.emit(this.form.getRawValue());
  }
}
