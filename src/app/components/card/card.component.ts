import {
  Component,
  EventEmitter,
  Input,
  LOCALE_ID,
  Output,
} from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { CardProps, CardCSSClasses } from 'src/models/card/card';

registerLocaleData(localePt);

@Component({
  standalone: true,
  imports: [CommonModule],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() public config!: CardProps;
  @Output() public reload: EventEmitter<boolean> = new EventEmitter();

  private readonly CRITICAL_VALUE = 1;
  private readonly IMPORTANT_VALUE = 5;

  public setCardClass(): CardCSSClasses {
    if (this.config && this.config.value) {
      return this.config.value <= this.CRITICAL_VALUE
        ? 'text-red'
        : this.config.value > this.IMPORTANT_VALUE
        ? 'text-blue'
        : 'text-green';
    }
    return 'no-class';
  }

  public click(): void {
    this.reload.emit(true);
  }
}
