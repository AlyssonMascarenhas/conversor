import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AwesomeGetPriceTransform, GetPriceFilter } from 'src/models';
import { HomeComponent, INTERVAL_RELOAD } from './home.component';
import { RESPONSE_MOCK } from './mock';

@Injectable({
  providedIn: 'root',
})
export class AwesomeAPIServiceMock {
  public getPrice(filter: GetPriceFilter): AwesomeGetPriceTransform {
    return RESPONSE_MOCK;
  }
}

describe('HomeComponent', () => {
  let homeComponent: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let awesomeService: AwesomeAPIServiceMock;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).createComponent(HomeComponent);
    homeComponent = fixture.componentInstance;
    awesomeService = TestBed.inject(AwesomeAPIServiceMock);
    jest.spyOn(awesomeService, 'getPrice');
  });

  it('should create', () => {
    expect(homeComponent).toBeTruthy();
  });

  it('should render three cards', () => {
    const cards = document.getElementsByTagName('app-card');
    expect(cards).toHaveLength(3);
  });

  it('should load cards on init', () => {
    // @ts-ignore
    jest.spyOn(homeComponent, '_loadCards');
    homeComponent.ngOnInit();
    // @ts-ignore
    expect(homeComponent._loadCards).toHaveBeenCalled();
  });

  it('should clear subscriptions on destroy', () => {
    // @ts-ignore
    jest.spyOn(homeComponent, '_clearSubscriptions$');
    homeComponent.ngOnDestroy();
    // @ts-ignore
    expect(homeComponent._clearSubscriptions$).toHaveBeenCalled();
  });

  it('should reload a card', () => {
    const cardType = 'cardCAD';
    jest.spyOn(homeComponent, 'reloadCard');
    homeComponent.reloadCard(cardType);
    expect(homeComponent.reloadCard).toHaveBeenCalledWith(cardType);
  });

  it('should clear a card', () => {
    const card = { value: 10, updated: '2023-10-19', variation: 5 };
    // @ts-ignore
    homeComponent._clearCard(card);
    expect(card.value).toBe(0);
    expect(card.updated).toBeUndefined();
    expect(card.variation).toBeUndefined();
  });

  it('should clear subscriptions', () => {
    const subscription = { unsubscribe: () => {} };
    jest.spyOn(subscription, 'unsubscribe');
    // @ts-ignore
    homeComponent.subscriptions$.push(subscription);
    // @ts-ignore
    homeComponent._clearSubscriptions$();
    expect(subscription.unsubscribe).toHaveBeenCalled();
    expect(homeComponent.subscriptions$.length).toBe(0);
  });

  it('should load cards', async () => {
    jest.spyOn(homeComponent, 'reloadCard');
    // @ts-ignore
    homeComponent._loadCards();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(homeComponent.reloadCard).toHaveBeenCalledTimes(3);
  });

  it('should call _loadCards() on interval', async () => {
    jest.useFakeTimers();
    homeComponent.ngOnInit();
    // @ts-ignore
    jest.spyOn(homeComponent, '_loadCards');
    jest.advanceTimersByTime(INTERVAL_RELOAD);
    // @ts-ignore
    expect(homeComponent._loadCards).toHaveBeenCalled();
    jest.useRealTimers();
  });
});
