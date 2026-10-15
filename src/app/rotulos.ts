import type { Prioridade, Status } from '../tipos';

export const rotuloStatus: Record<Status, string> = {
  'a-fazer': 'A fazer',
  'em-andamento': 'Em andamento',
  'em-revisao': 'Em revisão',
  'concluida': 'Concluída',
};

export const rotuloPrioridade: Record<Prioridade, string> = {
  baixa: 'Baixa',
  media: 'Média',
  alta: 'Alta',
};

// "2026-10-06" -> "06/10/2026" (sem new Date, que mudaria o dia por causa do fuso)
export function formatarData(data: string): string {
  return data.split('-').reverse().join('/');
}
