import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinearReferenceComponent } from './linear-reference.component';

const routes: Routes = [
  { path: '', component: LinearReferenceComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LinearReferenceRoutingModule {}
