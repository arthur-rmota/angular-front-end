import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Api } from './api';

describe('Api (escrita)', () => {
  let api: Api;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    api = TestBed.inject(Api);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  const novaTarefa = {
    projetoId: '1',
    titulo: 'Teste',
    descricao: 'Descrição',
    status: 'a-fazer' as const,
    prioridade: 'media' as const,
    responsavel: 'Rebeca',
    prazo: '2026-10-30',
  };

  it('criarTarefa envia POST /tarefas com os dados', () => {
    api.criarTarefa(novaTarefa).subscribe();
    const req = http.expectOne('http://localhost:3000/tarefas');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(novaTarefa);
    req.flush({ id: '7', ...novaTarefa });
  });

  it('atualizarTarefa envia PATCH /tarefas/:id só com os campos alterados', () => {
    api.atualizarTarefa('3', { status: 'concluida' }).subscribe();
    const req = http.expectOne('http://localhost:3000/tarefas/3');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ status: 'concluida' });
    req.flush({});
  });

  it('criarProjeto envia POST /projetos e preenche criadoEm com a data de hoje', () => {
    api.criarProjeto({ nome: 'Novo', descricao: 'Desc', disciplina: 'Front' }).subscribe();
    const req = http.expectOne('http://localhost:3000/projetos');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.nome).toBe('Novo');
    expect(req.request.body.criadoEm).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    req.flush({});
  });

  it('atualizarProjeto envia PATCH /projetos/:id', () => {
    api.atualizarProjeto('2', { nome: 'Outro nome' }).subscribe();
    const req = http.expectOne('http://localhost:3000/projetos/2');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ nome: 'Outro nome' });
    req.flush({});
  });

  it('as funções de leitura continuam iguais', () => {
    api.buscarProjeto('1').subscribe();
    http.expectOne('http://localhost:3000/projetos/1?_embed=tarefas').flush({});
    api.listarTarefas().subscribe();
    http.expectOne('http://localhost:3000/tarefas').flush([]);
  });
});
