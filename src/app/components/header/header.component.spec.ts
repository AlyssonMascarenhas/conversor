import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HeaderProps } from 'src/models';

@Component({
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  template: '<app-header [config]="headerTestConfig"></app-header>',
})
export class HeaderTestComponent {
  public headerTestConfig: HeaderProps = {
    logo: {
      src: 'img_address',
      alt: 'img_desc',
    },
  };
}

describe('HeaderComponent', () => {
  let headerComponent!: HeaderTestComponent;
  let fixture!: ComponentFixture<HeaderTestComponent>;

  beforeEach(async () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(HeaderTestComponent);
    headerComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(async () => {
    fixture.destroy();
  });

  it('should render headerComponent', async () => {
    expect(headerComponent).toBeTruthy();
  });

  it('should render a image in headerComponent', async () => {
    const image = document.getElementsByTagName('img');
    expect(image).toHaveLength(1);
  });

  it('should render a image with alt atribute', async () => {
    const image = document.getElementsByTagName('img')[0];
    const alt = image.getAttribute('alt');
    expect(alt).toBeDefined();
  });
});
