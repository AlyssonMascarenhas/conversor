import { Component, OnDestroy, OnInit } from '@angular/core';

import { CardEnum, CardProps, CardType, HeaderProps } from 'src/models';
import { AwesomeAPIService, ServicesModule } from 'src/services';
import { CardComponent, HeaderComponent } from './../../components';
import { Subscription, finalize, interval, take } from 'rxjs';

export const INTERVAL_RELOAD = 180000;

@Component({
  standalone: true,
  imports: [HeaderComponent, CardComponent, ServicesModule],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public subscriptions$: Subscription[] = [];

  public headerConfig: HeaderProps = {
    logo: {
      src: './../../assets/svgs/logo.svg',
      alt: 'Logo do sistema, a esquerda da logo temos 3 pilhas de moedas douradas, e na direita temos o nome Currency Converter',
    },
  };

  public cardCAD: CardProps = {
    loading: false,
    title: 'Dólar Canadense',
    filter: 'CAD-BRL',
  };

  public cardARS: CardProps = {
    loading: false,
    title: 'Peso Argentino',
    filter: 'ARS-BRL',
  };

  public cardGBP: CardProps = {
    loading: false,
    title: 'Libra Esterlina',
    filter: 'GBP-BRL',
  };

  constructor(private awesomeService: AwesomeAPIService) {}

  public ngOnInit(): void {
    this._loadCards();

    const refreshSubscriptions$ = interval(INTERVAL_RELOAD).subscribe(() =>
      this._loadCards()
    );

    this.subscriptions$.push(refreshSubscriptions$);
  }

  public ngOnDestroy(): void {
    this._clearSubscriptions$();
  }

  public reloadCard(card: CardType): void {
    const cards: Record<CardType, keyof this> = {
      [CardEnum.cardCAD]: 'cardCAD',
      [CardEnum.cardARS]: 'cardARS',
      [CardEnum.cardGBP]: 'cardGBP',
    };

    const property = cards[card];

    if (this[property]) {
      (this[property] as unknown as CardProps).loading = true;
    }

    const awesomeService$ = this.awesomeService
      .getPrice((this[property] as unknown as CardProps).filter)
      .pipe(
        take(1),
        finalize(
          () => ((this[property] as unknown as CardProps).loading = false)
        )
      )
      .subscribe((response) => {
        this._clearCard(this[property] as unknown as CardProps);
        (this[property] as unknown as CardProps).value = response.value;
        (this[property] as unknown as CardProps).updated = response.updated;
        (this[property] as unknown as CardProps).variation = response.variation;
      });
    this.subscriptions$.push(awesomeService$);
  }

  private _loadCards(): void {
    const cardsToLoad: CardType[] = ['cardARS', 'cardCAD', 'cardGBP'];

    for (const card of cardsToLoad) {
      this.reloadCard(card);
    }
  }

  private _clearCard(card: CardProps): void {
    card.value = 0;
    card.updated = undefined;
    card.variation = undefined;
  }

  private _clearSubscriptions$(): void {
    if (this.subscriptions$.length) {
      this.subscriptions$.forEach((subscription$) =>
        subscription$.unsubscribe()
      );
      this.subscriptions$ = [];
    }
  }
}
