import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CounterPageRoutingModule } from './counter-routing.module';

import { CounterPage } from './counter.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, CounterPageRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [CounterPage],
})
export class CounterPageModule {}
