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
  {
    path: 'feature-viewer',
    loadChildren: () =>
      import(
        './pages/featurecollection-view/featurecollection-view.module'
      ).then((m) => m.FeatureCollectionViewModule),
  },
  {
    path: 'linear-reference',
    loadChildren: () =>
      import('./pages/linear-reference/linear-reference.module').then(
        (m) => m.LinearReferenceModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
