import type { Atendimento } from 'src/types/atendimento';

export function calcularEspera(atendimento: Atendimento, inicioConsulta: string) {
  const inicioTriagem = new Date(atendimento.criadoEm).getTime();
  const inicio = new Date(inicioConsulta).getTime();

  if (isNaN(inicioTriagem) || isNaN(inicio)) return 0;

  return Math.floor((inicio - inicioTriagem) / 1000 / 60);
}

export function calcularConsulta(inicioConsulta: string, finalizadoEm: string) {
  const inicio = new Date(inicioConsulta).getTime();
  const fim = new Date(finalizadoEm).getTime();

  if (isNaN(inicio) || isNaN(fim)) return 0;

  return Math.floor((fim - inicio) / 1000 / 60);
}

export function calcularTotal(espera: number, consulta: number) {
  return (espera || 0) + (consulta || 0);
}
