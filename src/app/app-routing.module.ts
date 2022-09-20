import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  RouterModule,
  Routes,
  ExtraOptions,
} from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./folder/folder.module').then((m) => m.FolderPageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'auth/login',
    loadChildren: () =>
      import('./pages/auth/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'auth/register',
    loadChildren: () =>
      import('./pages/auth/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'factory/counter',
    loadChildren: () =>
      import('./pages/factory/counter/counter.module').then(
        (m) => m.CounterPageModule
      ),
  },
];

const config: ExtraOptions = {
  useHash: true,
  enableTracing: false,
  preloadingStrategy: PreloadAllModules,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
