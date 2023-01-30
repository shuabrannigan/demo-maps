import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LinearReferenceRoutingModule } from './linear-reference-routing.module';
import { LinearReferenceComponent } from './linear-reference.component';

@NgModule({
  declarations: [LinearReferenceComponent],
  imports: [CommonModule, SharedModule, LinearReferenceRoutingModule],
})
export class LinearReferenceModule {}
