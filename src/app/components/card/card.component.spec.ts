import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { fireEvent, screen } from '@testing-library/angular';

import { CardProps } from 'src/models';
import { CardComponent } from './card.component';

@Component({
  standalone: true,
  imports: [CommonModule, CardComponent],
  template:
    '<app-card [config]="cardTestConfig" (reload)="cardTestReload()"></app-card>',
})
class CardTestComponent {
  public cardTestConfig: CardProps = {
    filter: 'ARS-BRL',
    loading: true,
    title: 'Card de Teste',
    updated: {
      title: 'Atualizado',
      value: '10:00:00',
    },
    variation: {
      title: 'Variacao',
      value: 0.59,
    },
    value: 5.5,
  };

  public cardTestReload(): void {
    console.log('CardTestReload');
  }
}

describe('CardComponent', () => {
  let cardComponent!: CardTestComponent;
  let fixture!: ComponentFixture<CardTestComponent>;

  beforeEach(async () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(CardTestComponent);
    cardComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(async () => {
    fixture.destroy();
  });

  it('should render cardComponent', async () => {
    expect(cardComponent).toBeTruthy();
  });

  it('should render a title in cardComponent', async () => {
    expect(screen.getByTestId('card-title').innerHTML).toEqual(
      cardComponent.cardTestConfig.title
    );
  });

  it('should not show card loading if config.loading is false', async () => {
    cardComponent.cardTestConfig.loading = false;
    fixture.detectChanges();
    const loading = screen.queryByTestId('card-loading');
    expect(loading).toBeNull();
  });

  it('should how card loading if config.loading is true', async () => {
    cardComponent.cardTestConfig.loading = true;
    fixture.detectChanges();
    const loading = screen.queryByTestId('card-loading');
    expect(loading).not.toBeNull();
  });

  it.each([0, 0.5, 1, 10])(
    'should render template success when loading is false and value is valid',
    async (value) => {
      cardComponent.cardTestConfig.loading = false;
      cardComponent.cardTestConfig.value = value;
      fixture.detectChanges();
      const templateSuccess = screen.getByTestId('card-success');
      expect(templateSuccess).not.toBeNull();
      const cardValue = screen.getByTestId('card-value');
      expect(cardValue).not.toBeNull();
    }
  );

  it('should render template error when value is not valid', async () => {
    cardComponent.cardTestConfig.value = undefined;
    cardComponent.cardTestConfig.loading = false;
    fixture.detectChanges();
    const templateError = screen.getByTestId('card-error');
    expect(templateError).not.toBeNull();
  });

  it('should check if the cardTestReload is called when button is clicked', async () => {
    cardComponent.cardTestConfig.value = undefined;
    cardComponent.cardTestConfig.loading = false;
    fixture.detectChanges();
    const cardTestReloadMock = jest.fn();
    cardComponent.cardTestReload = cardTestReloadMock;
    const buttonReload = screen.getByTestId('card-button-reload');
    fireEvent.click(buttonReload);
    expect(cardTestReloadMock).toHaveBeenCalled();
  });
});
