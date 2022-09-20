import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { LoginPage } from './login/login';
// import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';
// import { LogoutComponent } from './logout/logout.component';
// import { RequestPasswordComponent } from './request-password/request-password.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
// import { NotFoundComponent } from '../pages/miscellaneous/not-found/not-found.component';
// import { TermsComponent } from './register/terms/terms.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginPage,
      },
      {
        path: '**',
        component: LoginPage,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
