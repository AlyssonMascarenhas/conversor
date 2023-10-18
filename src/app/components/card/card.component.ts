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

  public click(): void {
    this.reload.emit(true);
  }

  public setCardClass(): CardCSSClasses {
    if (this.config && this.config.value) {
      return this.config.value <= 1
        ? 'text-red'
        : this.config.value > 5
        ? 'text-blue'
        : 'text-green';
    }
    return 'no-class';
  }
}
