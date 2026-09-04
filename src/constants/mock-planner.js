import { BrandColors } from '@/constants/brand';

export const WEEKDAY_SHORT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
export const WEEKDAY_LONG = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];
export const MONTH_SHORT = [
  'JAN',
  'FEV',
  'MAR',
  'ABR',
  'MAI',
  'JUN',
  'JUL',
  'AGO',
  'SET',
  'OUT',
  'NOV',
  'DEZ',
];
export const MONTH_LONG = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
];

export const PLANNER_TIMES = ['07:00', '08:00', '09:00', '09:30', '11:00', '14:00', '16:00', '18:00'];
export const PLANNER_DURATIONS = ['45min', '1h', '1h 30min'];

export const WEEKDAY_BLOCKS = [
  {
    id: 'math',
    time: '08:00',
    subject: 'Matemática',
    subtitle: 'Lista de exercícios',
    duration: '1h',
    color: BrandColors.math,
    done: true,
  },
  {
    id: 'history',
    time: '09:30',
    subject: 'História',
    subtitle: 'Prova sobre Brasil República',
    duration: '1h 30min',
    color: BrandColors.history,
    done: true,
  },
  {
    id: 'portuguese',
    time: '11:00',
    subject: 'Português',
    subtitle: 'Leitura e resumo',
    duration: '1h',
    color: BrandColors.portuguese,
    done: true,
  },
  {
    id: 'english',
    time: '14:00',
    subject: 'Inglês',
    subtitle: 'Atividade de vocabulário',
    duration: '45min',
    color: BrandColors.english,
    done: true,
  },
  {
    id: 'geography',
    time: '16:00',
    subject: 'Geografia',
    subtitle: 'Estudo para prova',
    duration: '1h',
    color: BrandColors.geography,
    done: false,
  },
];

export const WEEKEND_BLOCKS = [
  {
    id: 'review',
    time: '10:00',
    subject: 'Português',
    subtitle: 'Revisão da semana',
    duration: '1h',
    color: BrandColors.portuguese,
    done: false,
  },
];

export function startOfDay(date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

export function dateKey(date) {
  const day = startOfDay(date);
  return `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`;
}

export function mondayOf(date) {
  const day = startOfDay(date);
  const weekday = day.getDay();
  const offset = weekday === 0 ? -6 : 1 - weekday;
  day.setDate(day.getDate() + offset);
  return day;
}

export function weekDaysFrom(date) {
  const monday = mondayOf(date);
  return Array.from({ length: 7 }, (_, index) => {
    const day = new Date(monday);
    day.setDate(monday.getDate() + index);
    return day;
  });
}

export function sameDay(left, right) {
  return dateKey(left) === dateKey(right);
}

export function formatDayHeading(date) {
  return `${WEEKDAY_LONG[date.getDay()]}, ${date.getDate()} de ${MONTH_LONG[date.getMonth()]}`;
}

function cloneBlocks(blocks, key) {
  return blocks.map((item) => ({ ...item, id: `${key}-${item.id}` }));
}

export function blocksForDate(date) {
  const key = dateKey(date);
  const weekday = date.getDay();
  if (weekday === 0 || weekday === 6) {
    return cloneBlocks(WEEKEND_BLOCKS, key);
  }
  return cloneBlocks(WEEKDAY_BLOCKS, key);
}
