import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturecollectionViewComponent } from './featurecollection-view.component';

const routes: Routes = [
  { path: '', component: FeaturecollectionViewComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureCollectionViewRoutingModule {}
