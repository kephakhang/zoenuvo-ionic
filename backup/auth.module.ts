import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule],
  exports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule {}
