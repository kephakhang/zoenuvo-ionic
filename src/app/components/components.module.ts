import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { TitlebarComponent } from './titlebar/titlebar.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [TitlebarComponent, SideMenuComponent],
  exports: [TitlebarComponent, SideMenuComponent],
  entryComponents: [],
})
export class ComponentsModule {}
