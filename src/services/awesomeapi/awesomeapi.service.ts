import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {
  AwesomeGetPriceTransform,
  GetPriceFilter,
  ResponseAwesomeGetPrice,
} from 'src/models/service/awesome/awesome';
import { AwesomeAPIServiceTransform } from './awesomeapi.transform.service';

@Injectable({
  providedIn: 'root',
})
export class AwesomeAPIService {
  public readonly baseURL = 'https://economia.awesomeapi.com.br/json/last';

  constructor(
    protected http: HttpClient,
    private awesomeServiceTransform: AwesomeAPIServiceTransform
  ) {}

  public getPrice(
    filter: GetPriceFilter
  ): Observable<AwesomeGetPriceTransform> {
    const URL = `${this.baseURL}/${filter}`;
    return this.http
      .get<ResponseAwesomeGetPrice>(URL)
      .pipe(
        map((response) =>
          this.awesomeServiceTransform.getPriceTransform(response)
        )
      );
  }
}
