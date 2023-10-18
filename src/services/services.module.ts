import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AwesomeAPIService } from './awesomeapi/awesomeapi.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [],
  providers: [AwesomeAPIService],
})
export class ServicesModule {}
