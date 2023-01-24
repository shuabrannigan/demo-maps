import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'root-menu',
    pathMatch: 'full',
  },
  {
    path: 'root-menu',
    loadChildren: () =>
      import('./pages/root-page/root-page.module').then(
        (m) => m.RootPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
