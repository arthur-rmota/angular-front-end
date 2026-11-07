import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timeout, delay } from 'rxjs';
import type { NovaTarefa, Projeto, Tarefa } from '../tipos';

export type ProjetoComTarefas = Projeto & { tarefas: Tarefa[] };
export type NovoProjeto = Omit<Projeto, 'id' | 'criadoEm'>;

function hoje(): string {
  return new Date().toLocaleDateString('sv-SE');
}

@Injectable({ providedIn: 'root' })
export class Api {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000';

  listarTarefas(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(`${this.url}/tarefas`).pipe(timeout({first: 10000}));
  }

  buscarTarefa(id: string): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${this.url}/tarefas/${id}`).pipe(timeout({ first: 10000 }));
  }

  listarProjetos(): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(`${this.url}/projetos`).pipe(timeout({ first: 10000 }));
  }

  // GET /tarefas?projetoId=1 volta vazio no json-server (o id é texto no db.json),
  // então as tarefas do projeto vêm embutidas com _embed.
  buscarProjeto(id: string): Observable<ProjetoComTarefas> {
    return this.http.get<ProjetoComTarefas>(`${this.url}/projetos/${id}?_embed=tarefas`).pipe(timeout({ first: 10000 }));
  }

  // as funções de escrita só enviam o pedido quando chama .subscribe() nelas
  criarTarefa(tarefa: NovaTarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(`${this.url}/tarefas`, tarefa);
  }

  atualizarTarefa(id: string, dados: Partial<NovaTarefa>): Observable<Tarefa> {
    return this.http.patch<Tarefa>(`${this.url}/tarefas/${id}`, dados);
  }

  excluirTarefa(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/tarefas/${id}`);
  }

  criarProjeto(projeto: NovoProjeto): Observable<Projeto> {
    return this.http.post<Projeto>(`${this.url}/projetos`, { ...projeto, criadoEm: hoje() }).pipe(delay(5000));
  }

  atualizarProjeto(id: string, dados: Partial<NovoProjeto>): Observable<Projeto> {
    return this.http.patch<Projeto>(`${this.url}/projetos/${id}`, dados);
  }
}
