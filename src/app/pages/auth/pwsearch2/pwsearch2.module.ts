import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Pwsearch2Page } from './pwsearch2.page';

const routes: Routes = [
  {
    path: '',
    component: Pwsearch2Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Pwsearch2Page]
})
export class Pwsearch2PageModule {}
