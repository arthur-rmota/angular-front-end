import { TestBed } from '@angular/core/testing';
import { EstadoTarefas } from './estado-tarefas';

describe('EstadoTarefas', () => {
  let service: EstadoTarefas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoTarefas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
