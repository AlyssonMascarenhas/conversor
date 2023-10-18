import { UpdatedCardProps, VariationCardProps } from 'src/models/card';

export type GetPriceFilter = 'CAD-BRL' | 'ARS-BRL' | 'GBP-BRL';

export interface AwesomeGetPrice {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
}

export interface ResponseAwesomeGetPrice {
  [x: string]: AwesomeGetPrice;
}

export interface AwesomeGetPriceTransform {
  value: number;
  variation: VariationCardProps;
  updated: UpdatedCardProps;
}
