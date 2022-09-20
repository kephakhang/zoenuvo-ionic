import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LoginPage } from './login';

import { LoginPageRoutingModule } from './login-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, LoginPageRoutingModule],
  declarations: [LoginPage],
})
export class LoginModule {}
