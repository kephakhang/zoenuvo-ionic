import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Idsearch2Page } from './idsearch2.page';

const routes: Routes = [
  {
    path: '',
    component: Idsearch2Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Idsearch2Page]
})
export class Idsearch2PageModule {}
