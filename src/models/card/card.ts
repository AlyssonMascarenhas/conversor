import { GetPriceFilter } from '../service';

export interface VariationCardProps {
  title: string;
  value: number;
}

export interface UpdatedCardProps {
  title: string;
  value: string;
}

export interface CardProps {
  title: string;
  loading: boolean;
  filter: GetPriceFilter;
  value?: number;
  variation?: VariationCardProps;
  updated?: UpdatedCardProps;
}

export enum CardEnum {
  cardCAD = 'cardCAD',
  cardARS = 'cardARS',
  cardGBP = 'cardGBP',
}

export type CardType = 'cardCAD' | 'cardARS' | 'cardGBP';

export type CardCSSClasses =
  | 'text-green'
  | 'text-red'
  | 'text-blue'
  | 'no-class';
