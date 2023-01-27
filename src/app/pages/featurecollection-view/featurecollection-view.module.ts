import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FeatureCollectionViewRoutingModule } from './featurecollection-view-routing.module';
import { FeaturecollectionViewComponent } from './featurecollection-view.component';

@NgModule({
  declarations: [FeaturecollectionViewComponent],
  imports: [CommonModule, SharedModule, FeatureCollectionViewRoutingModule],
})
export class FeatureCollectionViewModule {}
