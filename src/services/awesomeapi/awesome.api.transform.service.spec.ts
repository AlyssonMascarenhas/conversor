import { AwesomeAPIServiceTransform } from './awesomeapi.transform.service';
import { ResponseAwesomeGetPrice } from 'src/models';
import { MOCK_RESPONSE } from './mock';

describe('AwesomeAPIServiceTransform', () => {
  let awesomeService: AwesomeAPIServiceTransform;

  beforeEach(() => {
    awesomeService = new AwesomeAPIServiceTransform();
  });

  it('should be created', () => {
    expect(awesomeService).toBeTruthy();
  });

  describe('getPriceTransform', () => {
    it('should transform the response correctly', () => {
      const response: ResponseAwesomeGetPrice = MOCK_RESPONSE;

      const transformedData = awesomeService.getPriceTransform(response);
      expect(transformedData.variation).toBeDefined();
      expect(transformedData.updated).toBeDefined();
      expect(transformedData.value).toBeDefined();
    });
  });
});
