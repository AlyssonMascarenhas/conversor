import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderProps } from 'src/models';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule],
})
export class HeaderComponent {
  @Input() public config?: HeaderProps;
}
