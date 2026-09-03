import { BrandColors } from '@/constants/brand';

export const SUBJECTS = [
  { name: 'Matemática', color: BrandColors.math },
  { name: 'História', color: BrandColors.history },
  { name: 'Português', color: BrandColors.portuguese },
  { name: 'Geografia', color: BrandColors.geography },
  { name: 'Inglês', color: BrandColors.english },
];

export const HOME_DAY_TASKS = [
  {
    id: 'math',
    title: 'Matemática',
    subtitle: 'Lista de exercícios',
    meta: 'Entrega hoje',
    color: BrandColors.math,
    soft: BrandColors.mathSoft,
    icon: { ios: 'book.fill', android: 'menu_book', web: 'menu_book' },
    done: false,
  },
  {
    id: 'history',
    title: 'História',
    subtitle: 'Prova sobre Brasil República',
    meta: '04/06',
    color: BrandColors.history,
    soft: BrandColors.historySoft,
    icon: { ios: 'book.closed', android: 'auto_stories', web: 'auto_stories' },
    done: false,
  },
  {
    id: 'portuguese',
    title: 'Português',
    subtitle: 'Leitura e resumo',
    meta: '30/05',
    color: BrandColors.portuguese,
    soft: BrandColors.portugueseSoft,
    icon: { ios: 'book', android: 'menu_book', web: 'menu_book' },
    done: false,
  },
];

export const MY_TASKS = [
  {
    id: 't1',
    title: 'Lista de exercícios',
    subject: 'Matemática',
    date: '26/05',
    color: BrandColors.math,
    done: false,
  },
  {
    id: 't2',
    title: 'Resumo - Era Vargas',
    subject: 'História',
    date: '30/05',
    color: BrandColors.history,
    done: true,
  },
  {
    id: 't3',
    title: 'Trabalho literatura',
    subject: 'Português',
    date: '02/06',
    color: BrandColors.portuguese,
    done: false,
  },
  {
    id: 't4',
    title: 'Estudar pra prova',
    subject: 'Geografia',
    date: '04/06',
    color: BrandColors.geography,
    done: false,
  },
  {
    id: 't5',
    title: 'Atividade de inglês',
    subject: 'Inglês',
    date: '05/06',
    color: BrandColors.english,
    done: true,
  },
];
