import { Injectable } from '@angular/core';

import { UpdatedCardProps, VariationCardProps } from 'src/models';
import {
  AwesomeGetPrice,
  AwesomeGetPriceTransform,
  ResponseAwesomeGetPrice,
} from 'src/models/service/awesome/awesome';

@Injectable({
  providedIn: 'root',
})
export class AwesomeAPIServiceTransform {
  public getPriceTransform(
    response: ResponseAwesomeGetPrice
  ): AwesomeGetPriceTransform {
    const responseUpdated = this._setResponse(response);
    const responseTransform: AwesomeGetPriceTransform = {
      variation: this._setVariation(responseUpdated.pctChange),
      updated: this._setUpdated(responseUpdated.create_date),
      value: this._returnValue(responseUpdated.bid),
    };
    return responseTransform;
  }

  private _setUpdated(updatedDate = '...'): UpdatedCardProps {
    return {
      title: this._returnUpdatedTitle(),
      value: this._returnUpdatedDate(updatedDate),
    };
  }

  private _setVariation(variationValue: string): VariationCardProps {
    return {
      title: this._returnVariationTitle(),
      value: Number(variationValue),
    };
  }

  private _returnVariationTitle(): string {
    return 'Variação (%)';
  }

  private _returnUpdatedTitle(): string {
    return 'Atualizado';
  }

  private _returnUpdatedDate(updated: string): string {
    const date = updated.split(' ');
    return date[1];
  }

  private _returnValue(value: string): number {
    return Number(value);
  }

  private _setResponse(response: ResponseAwesomeGetPrice): AwesomeGetPrice {
    const key = Object.keys(response);
    return response[key[0]];
  }
}
