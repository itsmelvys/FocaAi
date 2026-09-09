import { BrandColors } from '@/constants/brand';

export { SUBJECTS } from './mock-subjects';

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
    subtitle: 'Prova sobre a República no Brasil',
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
    priority: 'alta',
    done: false,
  },
  {
    id: 't2',
    title: 'Resumo da Era Vargas',
    subject: 'História',
    date: '30/05',
    color: BrandColors.history,
    priority: 'media',
    done: true,
  },
  {
    id: 't3',
    title: 'Trabalho de literatura',
    subject: 'Português',
    date: '02/06',
    color: BrandColors.portuguese,
    priority: 'media',
    done: false,
  },
  {
    id: 't4',
    title: 'Estudar para a prova',
    subject: 'Geografia',
    date: '04/06',
    color: BrandColors.geography,
    priority: 'alta',
    done: false,
  },
  {
    id: 't5',
    title: 'Atividade de inglês',
    subject: 'Inglês',
    date: '05/06',
    color: BrandColors.english,
    priority: 'baixa',
    done: true,
  },
];
