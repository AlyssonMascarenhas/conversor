import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import {
  GetPriceFilter,
  ResponseAwesomeGetPrice,
} from 'src/models/service/awesome/awesome';
import { AwesomeAPIService } from './awesomeapi.service';
import { AwesomeAPIServiceTransform } from './awesomeapi.transform.service';
import { MOCK_RESPONSE } from './mock';

describe('AwesomeAPIService', () => {
  let awesomeService: AwesomeAPIService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    awesomeService = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AwesomeAPIService, AwesomeAPIServiceTransform],
    }).inject(AwesomeAPIService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(awesomeService).toBeTruthy();
  });

  describe('getPrice', () => {
    it('should make an HTTP GET request and transform the response', () => {
      const filter: GetPriceFilter = 'ARS-BRL';
      const mockResponse: ResponseAwesomeGetPrice = MOCK_RESPONSE;

      awesomeService.getPrice(filter).subscribe((transformedData: any) => {
        expect(transformedData).toBeDefined();
      });

      const req = httpTestingController.expectOne(
        `${awesomeService.baseURL}/${filter}`
      );
      expect(req.request.method).toBe('GET');

      req.flush(mockResponse);
      httpTestingController.verify();
    });
  });
});
