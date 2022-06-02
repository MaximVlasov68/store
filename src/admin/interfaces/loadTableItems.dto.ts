import { IsNumber } from 'class-validator';

export class LoadTableItems {
  draw: number;

  start: number;

  length: number;

  search: { value: string };

  order: { column: number; dir: 'asc' | 'desc' }[];

  columns: {
    data: string;
    name: string;
    searchable: boolean;
    orderable: boolean;
  }[];
}
