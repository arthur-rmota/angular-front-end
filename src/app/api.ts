import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { Projeto, Tarefa } from '../tipos';

export type ProjetoComTarefas = Projeto & { tarefas: Tarefa[] };

@Injectable({ providedIn: 'root' })
export class Api {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000';

  listarTarefas(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(`${this.url}/tarefas`);
  }

  buscarTarefa(id: string): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${this.url}/tarefas/${id}`);
  }

  listarProjetos(): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(`${this.url}/projetos`);
  }

  // GET /tarefas?projetoId=1 volta vazio no json-server (o id é texto no db.json),
  // então as tarefas do projeto vêm embutidas com _embed.
  buscarProjeto(id: string): Observable<ProjetoComTarefas> {
    return this.http.get<ProjetoComTarefas>(`${this.url}/projetos/${id}?_embed=tarefas`);
  }

  // as funções de escrita só enviam o pedido quando chama .subscribe() nelas
  criarTarefa(tarefa: NovaTarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(`${this.url}/tarefas`, tarefa);
  }

  atualizarTarefa(id: string, dados: Partial<NovaTarefa>): Observable<Tarefa> {
    return this.http.patch<Tarefa>(`${this.url}/tarefas/${id}`, dados);
  }

  criarProjeto(projeto: NovoProjeto): Observable<Projeto> {
    return this.http.post<Projeto>(`${this.url}/projetos`, { ...projeto, criadoEm: hoje() });
  }

  atualizarProjeto(id: string, dados: Partial<NovoProjeto>): Observable<Projeto> {
    return this.http.patch<Projeto>(`${this.url}/projetos/${id}`, dados);
  }
}
