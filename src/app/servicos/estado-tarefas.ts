import { Service } from '@angular/core';
import { Injectable, computed, signal } from '@angular/core';
import type { Tarefa, Status, Prioridade } from '../../tipos';

@Injectable({
    providedIn: 'root',
})

export class EstadoTarefas {
    private tarefas = signal<Tarefa[]>([]);

    busca = signal('');
    status = signal<Status | ''>('');
    prioridade = signal<Prioridade | ''>('');

    tarefasFiltradas = computed(() => {
        const texto = this.busca().trim().toLocaleLowerCase();
        const statusSelecionado = this.status();
        const prioridadeSelecionada = this.prioridade();
        return this.tarefas().filter((tarefa) => {
            const correspondeTitulo = tarefa.titulo.toLocaleLowerCase().includes(texto);

            const correspondeStatus = !statusSelecionado || tarefa.status === statusSelecionado;

            const correspondePrioridade = !prioridadeSelecionada || tarefa.prioridade === prioridadeSelecionada;

            return (
                correspondeTitulo &&
                correspondeStatus &&
                correspondePrioridade
            );
        });
    });

    definirTarefas(tarefas: Tarefa[]): void {
        this.tarefas.set(tarefas);
    }

    definirBusca(texto: string): void {
        this.busca.set(texto);
    }

    definirStatus(status: Status | ''): void {
        this.status.set(status);
    }

    definirPrioridade(prioridade: Prioridade | ''): void {
        this.prioridade.set(prioridade);
    }
}
